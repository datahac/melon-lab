import React from 'react';
import RecentTrades from '~/components/RecentTrades';
import RecentTradesQuery from './data/recentTrades';

export default class RecentTradesContainer extends React.PureComponent {
  render() {
    return (
      <RecentTradesQuery
        fundAddress={this.props.fundAddress}
        baseAsset={this.props.baseAsset}
        quoteAsset={this.props.quoteAsset}
      >
        {recentTradesProps => {
          return (
            <RecentTrades
              {...this.props}
              trades={
                (recentTradesProps.data &&
                  recentTradesProps.data.recentTrades) ||
                []
              }
              loading={recentTradesProps.loading}
            />
          );
        }}
      </RecentTradesQuery>
    );
  }
}
