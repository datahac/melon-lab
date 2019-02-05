import React from 'react';
import RecentTrades from '~/components/RecentTrades';
import RecentTradesQuery from './data/recentTrades';

const RecentTradesContainer = ({
  fundAddress,
  baseAsset,
  quoteAsset,
  ...props
}) => (
  <RecentTradesQuery
    fundAddress={fundAddress}
    baseAsset={baseAsset}
    quoteAsset={quoteAsset}
  >
    {recentTradesProps => {
      return (
        <RecentTrades
          {...props}
          trades={
            (recentTradesProps.data && recentTradesProps.data.recentTrades) ||
            []
          }
          loading={recentTradesProps.loading}
        />
      );
    }}
  </RecentTradesQuery>
);

export default RecentTradesContainer;
