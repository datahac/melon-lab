import Holdings from '~/components/Holdings';
import Router from 'next/router';
import * as R from 'ramda';
import tokens from '~/shared/utils/tokens';

const mapHoldings = R.curryN(2, (nav, asset) => {
  const token = R.find(
    R.propEq('key', R.path(['balance', 'token', 'symbol'], asset)),
    tokens,
  );

  return {
    price: asset.price,
    balance: asset.balance,
    name: token && token.value,
    symbol: asset.balance.token.symbol,
  };
});

const sortHoldings = R.sortWith([
  R.descend(R.path(['balance', 'quantity'])),
  R.ascend(R.prop('symbol')),
]);

const HoldingsContainer = ({
  nav,
  loading,
  address,
  holdings,
  baseAsset,
  quoteAsset,
}) => {
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
    <Holdings
      quoteAsset={quoteAsset}
      baseAsset={baseAsset}
      holdings={sortHoldings(holdings.map(mapHoldings(nav)))}
      loading={loading}
      onClick={asset => onClick(asset, address)}
    />
  );
};

export default HoldingsContainer;
