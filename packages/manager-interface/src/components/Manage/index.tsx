import React from 'react';
import * as R from 'ramda';
import FundTemplate from '~/templates/Fund';
import FactSheet from '+/components/FactSheet';
import OrderBook from '+/components/OrderBook';
import OpenOrders from '+/components/OpenOrders';
import OrderForm from '+/components/OrderForm';
import Holdings from '+/components/Holdings';
import RecentTrades from '+/components/RecentTrades';
import OrderBookQuery from './data/orderbook';
import FundQuery from './data/fund';
import HoldingsQuery from './data/holdings';
import { compose, withState, withProps } from 'recompose';
import isSameAddress from '~/utils/isSameAddress';

const availableExchanges = [
  {
    value: 'RADAR_RELAY',
    text: 'Radar Relay',
  },
  {
    value: 'ERC_DEX',
    text: 'ERC Dex',
  },
  {
    value: 'OASIS_DEX',
    text: 'OasisDex',
  },
  {
    value: 'KYBER_NETWORK',
    text: 'Kyber',
  },
];

const withExchangeState = withState(
  'exchanges',
  'setExchanges',
  availableExchanges.map(exchange => exchange.value),
);

const withSelectedOrderState = withState('order', 'setOrder', {});
const withOrderBookProps = withProps({
  availableExchanges,
});

const Manage = ({
  network,
  quoteAsset,
  baseAsset,
  address,
  account,
  status,
  exchanges,
  setExchanges,
  availableExchanges,
  order,
  setOrder,
}) => (
  <HoldingsQuery address={address}>
    {holdingsProps => (
      <FundQuery address={address} account={account}>
        {fundProps => (
          <OrderBookQuery
            exchanges={exchanges}
            baseAsset={baseAsset}
            quoteAsset={quoteAsset}
          >
            {orderBookProps => (
              <FundTemplate
                FactSheet={FactSheet}
                FactSheetProps={{
                  ...R.pathOr({}, ['data', 'fund'])(fundProps),
                  network,
                  quoteAsset,
                  numberOfFunds: R.path(['data', 'totalFunds'])(fundProps),
                  loading: fundProps.loading,
                }}
                Holdings={Holdings}
                HoldingsProps={{
                  address,
                  holdings: R.pathOr([], ['data', 'fund', 'holdings'])(
                    holdingsProps,
                  ),
                  quoteAsset,
                  baseAsset,
                  loading: fundProps.loading || holdingsProps.loading,
                  nav: R.path(['data', 'fund', 'nav'])(fundProps),
                }}
                OrderForm={OrderForm}
                OrderFormProps={{
                  ...R.pathOr([], ['data', 'fund'])(orderBookProps),
                  quoteAsset,
                  baseAsset,
                  priceFeedUp: R.propOr(false, 'priceFeedUp')(status),
                  formValues: order,
                  isManager:
                    !!address && !!account && isSameAddress(account, address),
                }}
                OrderBook={OrderBook}
                OrderBookProps={{
                  ...R.pathOr({}, ['data', 'orderbook'])(orderBookProps),
                  quoteAsset,
                  baseAsset,
                  loading: orderBookProps.loading,
                  availableExchanges,
                  setExchanges,
                  exchanges,
                  setOrder,
                  holdings: R.pathOr([], ['data', 'fund', 'holdings'])(
                    holdingsProps,
                  ),
                }}
                OpenOrders={OpenOrders}
                OpenOrdersProps={{
                  address,
                  isManager:
                    !!address && !!account && isSameAddress(account, address),
                  // TODO: Compute this properly.
                  isReadyToTrade: true,
                }}
                RecentTrades={RecentTrades}
                RecentTradesProps={{
                  quoteAsset,
                  baseAsset,
                }}
              />
            )}
          </OrderBookQuery>
        )}
      </FundQuery>
    )}
  </HoldingsQuery>
);

export default compose(
  withExchangeState,
  withSelectedOrderState,
  withOrderBookProps,
)(Manage);
