import React, { useState } from 'react';
import Holdings from '~/components/Holdings';
import Router from 'next/router';
import * as R from 'ramda';
import tokens from '~/utils/tokens';
import ReleaseToken from '../ReleaseToken';

const mapHoldings = R.curryN(2, (nav, asset) => {
  const token = R.find(R.propEq('key', R.path(['balance', 'token', 'symbol'], asset)), tokens);

  return {
    price: asset.price,
    balance: asset.balance,
    locked: asset.locked,
    name: token && token.value,
    symbol: asset.balance.token.symbol,
    address: asset.balance.token.address,
  };
});

const sortHoldings = R.sortWith([R.descend(R.path(['balance', 'quantity'])), R.ascend(R.prop('symbol'))]);

const HoldingsContainer = ({ nav, loading, address, isManager, holdings, baseAsset, quoteAsset }) => {
  const [releaseToken, setReleaseToken] = useState(null);

  const onClick = (asset, address) => {
    Router.push({
      pathname: '/manage',
      query: {
        address,
        base: asset.symbol,
        quote: 'WETH',
      },
    });
  };

  return (
    <>
      <ReleaseToken fundAddress={address} releaseToken={releaseToken} setReleaseToken={setReleaseToken} />
      <Holdings
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
        holdings={sortHoldings(holdings.map(mapHoldings(nav)))}
        loading={loading}
        isManager={isManager}
        onClick={asset => onClick(asset, address)}
        setReleaseToken={setReleaseToken}
      />
    </>
  );
};

export default HoldingsContainer;
