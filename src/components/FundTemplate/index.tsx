import React from 'react';
import Composer from 'react-composer';
import * as R from 'ramda';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { CapabilityConsumer } from '+/components/CapabilityContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import Template from '~/templates/FundTemplate';
import FactSheet from '+/components/FactSheet';
import OrderForm from '+/components/OrderForm';
import Holdings from '+/components/Holdings';
import FundQuery from './data/fund';
import HoldingsQuery from './data/holdings';
import isSameAddress from '~/utils/isSameAddress';
import availableExchanges from '~/utils/availableExchanges';

const Context = ({ exchanges, address, quoteAsset, baseAsset, children }) => (
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

export default class FundTemplateContainer extends React.Component {
  state = {
    exchanges: availableExchanges.map(exchange => exchange.value),
    order: {
      price: '',
      orderType: 'Buy',
      strategy: 'Market',
      quantity: '',
      total: '',
      exchange: '',
    },
  };

  render() {
    const { exchanges } = this.state;
    const { address, quoteAsset, baseAsset } = this.props;

    return (
      <Context
        exchanges={exchanges}
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
              OrderBook={() => null}
              OrderBookProps={
                {
                  // TODO: Re-add this.
                }
              }
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
      </Context>
    );
  }
}
