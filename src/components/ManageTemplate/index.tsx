import React, { useState } from 'react';
import Composer from 'react-composer';
import * as R from 'ramda';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import Template from '~/templates/ManageTemplate';
import FactSheet from '+/components/FactSheet';
import OrderForm from '+/components/OrderForm';
import Holdings from '+/components/Holdings';
import OrderBook from '+/components/OrderBook';
import FundQuery from './data/fund';
import OrdersQuery from './data/orders';
import HoldingsQuery from './data/holdings';
import isSameAddress from '~/utils/isSameAddress';
import availableExchanges from '~/utils/availableExchanges';
import { aggregateOrders } from '@melonproject/exchange-aggregator/lib/exchanges/aggregate';

const AggregatedOrders = ({ baseAsset, quoteAsset, exchanges, children }) => (
  <Composer
    components={exchanges.map(exchange => (
      <OrdersQuery
        exchange={exchange}
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
      />
    ))}
  >
    {orderResponses => {
      const loading = !!orderResponses.find(R.propEq('loading', true));
      const orders = [].concat(
        ...orderResponses.map(R.pathOr([], ['data', 'orders'])),
      );
      const orderbook = aggregateOrders(orders);

      return children({
        ...orderbook,
        loading,
      });
    }}
  </Composer>
);

const Container = ({ address, quoteAsset, baseAsset, children }) => {
  const [exchanges, setExchanges] = useState(Object.keys(availableExchanges));

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
        ({ results: [account], render }) => (
          <FundQuery address={address} account={account} children={render} />
        ),
        <AggregatedOrders
          baseAsset={baseAsset}
          quoteAsset={quoteAsset}
          exchanges={exchanges}
        />,
      ]}
    >
      {children}
    </Composer>
  );
};

export default class ManageTemplateContainer extends React.Component {
  state = {
    exchange: 'OASIS_DEX',
    order: {
      type: 'Buy',
      strategy: 'Market',
      price: null,
      quantity: null,
      total: null,
      exchange: null,
    },
  };

  render() {
    const { exchange } = this.state;
    const { address, quoteAsset, baseAsset } = this.props;

    return (
      <Container
        exchange={exchange}
        address={address}
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
      >
        {([
          account,
          balances,
          network,
          capabibility,
          configuration,
          managerProps,
          holdingsProps,
          fundProps,
          ordersProps,
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
              FundHeadlineProps={{
                ...fundData,
                totalFunds,
                address,
                quoteAsset,
                loading: fundProps.loading,
              }}
              FactSheet={FactSheet}
              FactSheetProps={{
                fund: fundData,
                address,
                loading: fundProps.loading,
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
                formValues: this.state.order,
              }}
              OrderBook={OrderBook}
              OrderBookProps={{
                loading: ordersProps.loading,
                asks: ordersProps.asks,
                bids: ordersProps.bids,
              }}
              OpenOrders={() => null}
              OpenOrdersProps={
                {
                  // TODO: Re-add this.
                }
              }
              RecentTrades={() => null}
              RecentTradesProps={
                {
                  // TODO: Re-add this.
                }
              }
            />
          );
        }}
      </Container>
    );
  }
}
