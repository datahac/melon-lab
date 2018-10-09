import { networks } from '@melonproject/melon.js';
import { compose, withState, withPropsOnChange } from 'recompose';
import Ranking from '~/components/Ranking';
import { greaterThan } from '~/utils/functionalBigNumber';
import * as R from 'ramda';
import RankingQuery from './data/ranking';

const filterRankings = R.curryN(2, (search, fund) => {
  return fund.name.toLocaleLowerCase().includes(search);
});

const mapRankings = R.curryN(2, (network, fund) => ({
  ...fund,
  inception: fund.inception,
  sharePrice: fund.sharePrice,
  reportUrl: `https://${
    network === networks.KOVAN ? 'melon' : 'olympiad'
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

const withSearchAndSorting = withPropsOnChange(
  ['loading', 'funds', 'search', 'ordering', 'network'],
  props => ({
    funds:
      (!props.loading &&
        (props.funds || [])
          .slice()
          .filter(filterRankings(props.search.toLocaleLowerCase()))
          .map(mapRankings(props.network))
          .sort(sortRankings(props.ordering))) ||
      [],
  }),
);

const withRanking = BaseComponent => baseProps => (
  <RankingQuery>
    {rankingProps => (
      <BaseComponent
        associatedFund={baseProps.associatedFund && baseProps.associatedFund.address}
        setOrdering={order => baseProps.setOrdering({ variables: { order } })}
        setSearch={search => baseProps.setSearch({ variables: { search } })}
        ordering={baseProps.ordering}
        search={baseProps.search}
        funds={rankingProps.data && rankingProps.data.rankings}
        network={baseProps.network}
        loading={rankingProps.loading}
      />
    )}
  </RankingQuery>
);

const withOrdering = withState('ordering', 'setOrdering', '+rank');
const withSearch = withState('search', 'setSearch', '');

export default compose(
  withRanking,
  withSearch,
  withOrdering,
  withSearchAndSorting,
)(Ranking);
