import { compose, withPropsOnChange } from 'recompose';
import RecentTrades from '~/components/RecentTrades';
import RecentTradesQuery from './data/recentTrades';

const withMappedTrades = withPropsOnChange(['trades'], props => ({
  trades: props.trades.map(trade => ({
    ...trade,
    price: trade.price,
    quantity: trade.quantity,
    timestamp: trade.timestamp,
  })),
}));

const withRecentTrades = BaseComponent => baseProps => (
  <RecentTradesQuery
    baseAsset={baseProps.baseAsset}
    quoteAsset={baseProps.quoteAsset}
  >
    {recentTradesProps => (
      <BaseComponent
        {...baseProps}
        trades={
          (recentTradesProps.data && recentTradesProps.data.recentTrades) || []
        }
        loading={recentTradesProps.loading}
      />
    )}
  </RecentTradesQuery>
);

export default compose(
  withRecentTrades,
  withMappedTrades,
)(RecentTrades);
