import React from 'react';
import * as R from 'ramda';
import Composer from 'react-composer';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import Ranking from '~/components/Ranking';
import RankingQuery from './data/ranking';
import { greaterThan } from '~/utils/functionalBigNumber';

const filterRankings = R.curryN(2, (search, fund) => {
  return fund.name.toLocaleLowerCase().includes(search);
});

const mapRankings = R.curryN(2, (network, fund) => ({
  ...fund,
  inception: fund.inception,
  sharePrice: fund.sharePrice,
  reportUrl: `https://${
    network === 'KOVAN' ? 'melon' : 'olympiad'
  }-reporting.now.sh/report/${fund.address}`,
}));

const sortRankings = ordering => (a, b) => {
  if (ordering === '+rank') {
    return greaterThan(a.rank, b.rank) ? 1 : -1;
  }

  if (ordering === '-rank') {
    return greaterThan(b.rank, a.rank) ? 1 : -1;
  }

  if (ordering === '+price') {
    return greaterThan(a.sharePrice, b.sharePrice) ? 1 : -1;
  }

  if (ordering === '-price') {
    return greaterThan(b.sharePrice, a.sharePrice) ? 1 : -1;
  }

  if (ordering === '+inception') {
    return new Date(a.inception) > new Date(b.inception) ? 1 : -1;
  }

  if (ordering === '-inception') {
    return new Date(b.inception) > new Date(a.inception) ? 1 : -1;
  }

  return 0;
};

export default class RankingContainer extends React.PureComponent {
  state = {
    ordering: '+rank',
    search: '',
  };

  setOrdering = ordering => {
    this.setState({
      ordering,
    });
  };

  setSearch = search => {
    this.setState({
      search,
    });
  };

  render() {
    return (
      <Composer
        components={[
          <NetworkConsumer />,
          <FundManagerConsumer />,
          <RankingQuery />,
        ]}
      >
        {([network, associatedFund, rankingProps]) => {
          const funds =
            (!rankingProps.loading &&
              ((rankingProps.data && rankingProps.data.rankings) || [])
                .slice()
                .filter(filterRankings(this.state.search.toLocaleLowerCase()))
                .map(mapRankings(network.network))
                .sort(sortRankings(this.state.ordering))) ||
            [];

          return (
            <Ranking
              associatedFund={associatedFund}
              network={network}
              funds={funds}
              loading={rankingProps.loading}
              search={this.state.search}
              ordering={this.state.ordering}
              setSearch={search => this.setSearch(search)}
              setOrdering={order => this.setOrdering(order)}
            />
          );
        }}
      </Composer>
    );
  }
}
