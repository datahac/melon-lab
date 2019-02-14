import React, { useState, useEffect } from 'react';
import Composer from 'react-composer';
import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';

import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import Template from '~/templates/ManageTemplate';
import OrderForm from '+/components/OrderForm';
import Holdings from '+/components/Holdings';
import OrderBook from '+/components/OrderBook';
import FundHeadline from '+/components/FundHeadline';
import FundQuery from './data/fund';
import HoldingsQuery from './data/holdings';
import isSameAddress from '~/shared/utils/isSameAddress';
import OpenOrdersContainer from '../OpenOrders';

import { Subscription } from 'react-apollo';
import { OrdersSubscription as query } from '~/queries/OrdersSubscription.gql';
import {
  isBidOrder,
  isAskOrder,
  sortOrders,
  reduceOrderVolumes,
  reduceOrderEvents,
} from '@melonproject/exchange-aggregator';
import availableExchanges from '~/shared/utils/availableExchanges';
import { useEventCallback } from 'rxjs-hooks';
import {
  scan,
  map,
  combineLatest,
  switchMap,
  startWith,
  distinctUntilChanged,
} from 'rxjs/operators';

// A bid-order on the orderbook resolves to a sell from the fund (The order maker wants to buy something, so we sell em)
const bidAskSellBuyMap = {
  BID: 'Sell',
  ASK: 'Buy',
};

export interface SetOrder {
  // Exchange-aggregator ID
  id: string;
  exchange: string;
  trade: Tm.PriceInterface;
  metadata: {
    // Oasis dex id
    id: string;
  };
  // BID/ASK
  type: string;
}

const useExchangeSelector = availableExchangesKeys => {
  const [current, set] = useState(availableExchangesKeys);

  const setFromEvent = event => {
    const value = event.target.value;

    if (value === 'ALL') {
      const unselect = current.length === availableExchangesKeys.length;
      return set(unselect ? [] : availableExchangesKeys);
    }

    if (!current.includes(value)) {
      return set([...current, value]);
    }

    const index = current.indexOf(value);
    return set([].concat(current.slice(0, index), current.slice(index + 1)));
  };

  const setFromValue = value => set(value);

  return [current, setFromEvent, setFromValue];
};

const useOrderSelector = order => {
  const [current, set] = useState(order);

  const setFromValue = order => {
    const { exchange, trade, metadata, type } = order;

    if (exchange === 'OASIS_DEX') {
      set({
        id: metadata && metadata.id,
        exchange: 'OASIS_DEX',
        price: trade,
        quantity: trade && trade.base,
        strategy: 'Market',
        total: trade && trade.quote,
        type: bidAskSellBuyMap[type],
        signedOrder: null,
      });
    } else if (exchange === 'RADAR_RELAY') {
      set({
        id: order.id,
        exchange: 'RADAR_RELAY',
        price: trade,
        quantity: trade && trade.base,
        strategy: 'Market',
        total: trade && trade.quote,
        type: bidAskSellBuyMap[type],
        signedOrder: metadata,
      });
    } else {
      set({
        exchange,
        strategy: 'Market',
        type: bidAskSellBuyMap[type],
        id: null,
        price: null,
        total: null,
        signedOrder: null,
        quantity: null,
      });
    }
  };

  return [current, setFromValue];
};

const OrdersSubscription = ({
  eventCallback,
  exchange,
  baseAsset,
  quoteAsset,
  children,
}) => (
  <Subscription
    ssr={false}
    subscription={query}
    variables={{
      exchange,
      base: baseAsset,
      quote: quoteAsset,
    }}
    onSubscriptionData={({ subscriptionData: { data } }) => {
      eventCallback(data.orders);
    }}
  >
    {children}
  </Subscription>
);

const AggregatedOrders = ({
  eventCallback,
  baseAsset,
  quoteAsset,
  exchanges,
  children,
}) => (
  <Composer
    components={exchanges.map(exchange => (
      <OrdersSubscription
        eventCallback={eventCallback}
        exchange={exchange}
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
      />
    ))}
  >
    {orderResponses => {
      const loading = !!orderResponses.find(R.propEq('loading', true));
      return children({ loading });
    }}
  </Composer>
);

export const ManageTemplateContainer = ({
  address,
  quoteAsset,
  baseAsset,
  fundProps,
}) => {
  const [selectedOrder, setOrder] = useOrderSelector({
    // Order ID is set when clicking on order in orderbook
    id: null,
    exchange: 'OASIS_DEX',
    price: null,
    quantity: null,
    strategy: 'Market',
    total: null,
    type: 'Buy',
    signedOrder: null,
  });

  const allowedExchangeNames = R.pathOr(
    [],
    ['data', 'fund', 'allowedExchanges'],
  )(fundProps);

  const exchangesMap = allowedExchangeNames.map(item => [
    item,
    availableExchanges[item],
  ]);

  const [
    selectedExchanges,
    updateExchanges,
    setAllowedExchanges,
  ] = useExchangeSelector(allowedExchangeNames);

  useEffect(() => {
    setAllowedExchanges(allowedExchangeNames);
  }, [fundProps.loading]);

  const [eventCallback, [asks, bids]] = useEventCallback(
    (events$, inputs$, _) => {
      const pair$ = inputs$.pipe(
        map(([, quote, base]) => ({ quote, base })),
        distinctUntilChanged(R.equals),
      );

      const stream$ = pair$.pipe(
        switchMap(() =>
          (events$ as any).pipe(
            scan(
              (carry, events) =>
                (events || []).reduce(reduceOrderEvents, carry),
              [],
            ),
            combineLatest(inputs$, (orders, [exchanges]) => {
              const filter = R.compose(
                R.includes(R.__, exchanges),
                R.prop('exchange'),
              );

              return orders.filter(filter);
            }),
            map(orders => {
              const asks = orders
                .filter(isAskOrder)
                .sort(sortOrders)
                .reverse()
                .reduce(reduceOrderVolumes, []);

              const bids = orders
                .filter(isBidOrder)
                .sort(sortOrders)
                .reduce(reduceOrderVolumes, []);

              return [asks, bids];
            }),
            startWith([[], []]),
          ),
        ),
      );

      return stream$;
    },
    [[], []],
    [selectedExchanges, quoteAsset, baseAsset],
  );

  return (
    <Composer
      components={[
        <AccountConsumer />,
        <BalanceConsumer />,
        <NetworkConsumer />,
        <CapabilityConsumer />,
        <ConfigurationConsumer />,
        <FundManagerConsumer />,
        <HoldingsQuery address={address} />,
        <AggregatedOrders
          quoteAsset={quoteAsset}
          baseAsset={baseAsset}
          exchanges={allowedExchangeNames}
          eventCallback={eventCallback}
        />,
      ]}
    >
      {([
        account,
        balances,
        network,
        capabibility,
        configuration,
        managerProps,
        holdingsProps,
        orderbookProps,
      ]) => {
        const holdingsData = R.pathOr([], ['data', 'fund', 'holdings'])(
          holdingsProps,
        );
        const fundData = R.pathOr({}, ['data', 'fund'])(fundProps);
        const totalFunds = R.pathOr(0, ['data', 'totalFunds'])(fundProps);
        const isManager =
          !!managerProps.fund && isSameAddress(managerProps.fund, address);

        return (
          <Template
            HeaderProps={{
              ethBalance: balances && balances.eth,
              canInvest: capabibility && capabibility.canInvest,
              canInteract: capabibility && capabibility.canInteract,
              canonicalPriceFeedAddress:
                configuration && configuration.melonContracts.priceSource,
              network: network && network.network,
              currentBlock: network && network.currentBlock,
              blockOverdue: network && network.blockOverdue,
              nodeSynced: network && network.nodeSynced,
              priceFeedUp: network && network.priceFeedUp,
              address: account,
            }}
            FundHeadline={FundHeadline}
            FundHeadlineProps={{
              fund: fundData,
              totalFunds,
              address,
              quoteAsset,
              loading: fundProps.loading,
              account,
              isManager,
            }}
            Holdings={Holdings}
            HoldingsProps={{
              address,
              quoteAsset,
              baseAsset,
              holdings: holdingsData,
              loading: fundProps.loading || holdingsProps.loading,
              nav: fundData && fundData.nav,
            }}
            OrderForm={OrderForm}
            OrderFormProps={{
              address,
              quoteAsset,
              baseAsset,
              holdings: holdingsData,
              formValues: selectedOrder,
              key: baseAsset,
              exchanges: exchangesMap,
              bid: R.path(['trade'], R.head(bids)),
              ask: R.path(['trade'], R.head(asks)),
            }}
            OrderBook={OrderBook}
            OrderBookProps={{
              quoteAsset,
              baseAsset,
              isManager,
              setOrder,
              updateExchanges,
              selectedExchanges,
              asks,
              bids,
              allExchanges: exchangesMap.filter(
                ([name]) => name !== 'KYBER_NETWORK',
              ),
              loading: orderbookProps.loading || fundProps.loading,
            }}
            OpenOrders={OpenOrdersContainer}
            OpenOrdersProps={{
              address,
              isManager,
              canInteract: capabibility && capabibility.canInteract,
              // TODO: Re-add this.
            }}
            RecentTrades={() => null}
            RecentTradesProps={
              {
                // TODO: Re-add this.
              }
            }
          />
        );
      }}
    </Composer>
  );
};

export const ManageTemplate = ({ address, quoteAsset, baseAsset }) => {
  return (
    <Composer
      components={[
        <AccountConsumer />,
        ({ results: [account], render }) => (
          <FundQuery address={address} account={account} children={render} />
        ),
      ]}
    >
      {([account, fundProps]) => {
        return (
          <ManageTemplateContainer
            address={address}
            quoteAsset={quoteAsset}
            baseAsset={baseAsset}
            fundProps={fundProps}
          />
        );
      }}
    </Composer>
  );
};

export default ManageTemplate;
