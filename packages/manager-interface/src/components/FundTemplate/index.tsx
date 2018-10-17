import React from 'react';
import * as R from 'ramda';
import Template from '~/templates/FundTemplate';
import FactSheet from '+/components/FactSheet';
import OrderBook from '+/components/OrderBook';
import OpenOrders from '+/components/OpenOrders';
import OrderForm from '+/components/OrderForm';
import Holdings from '+/components/Holdings';
import RecentTrades from '+/components/RecentTrades';
import OrderBookQuery from './data/orderbook';
import FundQuery from './data/fund';
import HoldingsQuery from './data/holdings';
import { compose, withState } from 'recompose';
import isSameAddress from '~/utils/isSameAddress';
import availableExchanges from '~/utils/availableExchanges';

const withExchangeState = withState('exchanges', 'setExchanges', availableExchanges.map(exchange => exchange.value));

const withSelectedOrderState = withState('order', 'setOrder', {
  price: '',
  orderType: 'Buy',
  strategy: 'Market',
  quantity: '',
  total: '',
  exchange: '',
});

const FundTemplate = ({
  network,
  quoteAsset,
  baseAsset,
  address,
  account,
  exchanges,
  setExchanges,
  order,
  setOrder,
  priceFeedUp,
  message,
  eth,
  mln,
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
              <Template
                HeaderProps={{
                  network,
                  message,
                  address: account,
                  fundName: R.path(['data', 'fund', 'name'])(fundProps),
                  balances: {
                    eth,
                    mln,
                  },
                }}
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
                  holdings: R.pathOr([], ['data', 'fund', 'holdings'])(
                    holdingsProps,
                  ),
                  quoteAsset,
                  baseAsset,
                  priceFeedUp,
                  formValues: order,
                  isManager:
                    !!R.path(['data', 'associatedFund'])(fundProps) &&
                    !!R.path(['data', 'fund', 'address'])(fundProps) &&
                    isSameAddress(
                      fundProps.data.associatedFund.address,
                      fundProps.data.fund.address,
                    ),
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
                    !!R.path(['data', 'associatedFund'])(fundProps) &&
                    !!R.path(['data', 'fund', 'address'])(fundProps) &&
                    isSameAddress(
                      fundProps.data.associatedFund.address,
                      fundProps.data.fund.address,
                    ),
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
)(FundTemplate);
