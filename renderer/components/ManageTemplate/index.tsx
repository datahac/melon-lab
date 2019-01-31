import React from 'react';
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
import FactSheet from '+/components/FactSheet';
import OrderForm from '+/components/OrderForm';
import Holdings from '+/components/Holdings';
import OrderBook from '+/components/OrderBook';
import FundQuery from './data/fund';
import HoldingsQuery from './data/holdings';
import isSameAddress from '~/shared/utils/isSameAddress';
import OpenOrdersContainer from '../OpenOrders';

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

const Container = ({ address, children }) => {
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
      ]}
    >
      {children}
    </Composer>
  );
};

export default class ManageTemplateContainer extends React.Component {
  state = {
    order: {
      // Order ID is set when clicking on order in orderbook
      id: null,
      exchange: 'OASIS_DEX',
      price: null,
      quantity: null,
      strategy: 'Market',
      total: null,
      type: 'Buy',
      signedOrder: null,
    },
  };

  render() {
    const { address, quoteAsset, baseAsset } = this.props;

    const setOrder = order => {
      const { exchange, trade, metadata, type } = order;

      if (exchange === 'OASIS_DEX') {
        this.setState({
          order: {
            id: metadata && metadata.id,
            exchange: 'OASIS_DEX',
            price: trade,
            quantity: trade && trade.base,
            strategy: 'Market',
            total: trade && trade.quote,
            type: bidAskSellBuyMap[type],
          },
        });
      } else if (exchange === 'RADAR_RELAY') {
        this.setState({
          order: {
            id: order.id,
            exchange: 'RADAR_RELAY',
            price: trade,
            quantity: trade && trade.base,
            strategy: 'Market',
            total: trade && trade.quote,
            type: bidAskSellBuyMap[type],
            signedOrder: metadata,
          },
        });
      } else {
        this.setState({
          order: {
            exchange,
            strategy: 'Market',
            type: bidAskSellBuyMap[type],
            id: null,
            price: null,
            total: null,
          },
        });
      }
    };

    return (
      <Container address={address}>
        {([
          account,
          balances,
          network,
          capabibility,
          configuration,
          managerProps,
          holdingsProps,
          fundProps,
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
                setOrder,
                holdings: holdingsData,
                formValues: this.state.order,
                key: baseAsset,
              }}
              OrderBook={OrderBook}
              OrderBookProps={{
                quoteAsset,
                baseAsset,
                isManager,
                setOrder,
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
      </Container>
    );
  }
}
