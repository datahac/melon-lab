import React, { useState } from 'react';
import * as R from 'ramda';
import Composer from 'react-composer';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import Ranking from '~/components/Ranking';
import RankingQuery from './data/ranking';
import * as Tm from '@melonproject/token-math';

const filterRankings = R.curryN(2, (search, fund) => {
  return fund.name.toLocaleLowerCase().includes(search);
});

const availableOrdering = [
  {
    name: 'Highest rank',
    value: '+rank',
  },
  {
    name: 'Lowest rank',
    value: '-rank',
  },
  {
    name: 'Highest price',
    value: '-price',
  },
  {
    name: 'Lowest price',
    value: '+price',
  },
  {
    name: 'Newest',
    value: '-inception',
  },
  {
    name: 'Oldest',
    value: '+inception',
  },
];

const sortRankings = ordering => (a, b) => {
  if (ordering === '+rank') {
    return Tm.greaterThan(a.rank, b.rank) ? 1 : -1;
  }

  if (ordering === '-rank') {
    return Tm.greaterThan(b.rank, a.rank) ? 1 : -1;
  }

  if (ordering === '+price' || ordering === '-price') {
    const priceA = Tm.toAtomic(a.sharePrice);
    const priceB = Tm.toAtomic(b.sharePrice);
    const difference = parseFloat(Tm.subtract(priceB, priceA).toString());
    return ordering === '-price' ? difference : -difference;
  }

  if (ordering === '+inception') {
    return new Date(a.inception) > new Date(b.inception) ? 1 : -1;
  }

  if (ordering === '-inception') {
    return new Date(b.inception) > new Date(a.inception) ? 1 : -1;
  }

  return 0;
};

const RankingContainer = ({}) => {
  const [ordering, setOrdering] = useState('+rank');
  const [search, setSearch] = useState('');

  return (
    <Composer components={[<NetworkConsumer />, <FundManagerConsumer />, <RankingQuery />]}>
      {([network, managerProps, rankingProps]) => {
        const funds =
          (!rankingProps.loading &&
            ((rankingProps.data && rankingProps.data.rankings) || [])
              .slice()
              .filter(filterRankings(search.toLocaleLowerCase()))
              .sort(sortRankings(ordering))) ||
          [];

        return (
          <Ranking
            availableOrdering={availableOrdering}
            associatedFund={managerProps.fund}
            funds={funds}
            loading={rankingProps.loading}
            search={search}
            ordering={ordering}
            setSearch={search => setSearch(search)}
            setOrdering={order => setOrdering(order)}
          />
        );
      }}
    </Composer>
  );
};

export default RankingContainer;
