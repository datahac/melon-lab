import RecentTrades from '~/components/RecentTrades';
import RecentTradesQuery from './data/recentTrades';

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

export default withRecentTrades(RecentTrades);
