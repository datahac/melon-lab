import Holdings from '~/components/Holdings';
import Router from 'next/router';
import * as R from 'ramda';
import tokens from '~/shared/utils/tokens';

const mapHoldings = R.curryN(2, (nav, asset) => {
  const token = R.find(R.propEq('key', asset.balance.token.symbol), tokens);

  return {
    price: asset.price,
    // TODO: Re-implement fraction.
    fraction: 0,
    balance: asset.balance,
    name: token && token.value,
    symbol: asset.balance.token.symbol,
  };
});

const sortHoldings = R.sortWith([
  R.descend(R.prop('fraction')),
  R.ascend(R.prop('symbol')),
]);

export default class HoldingsContainer extends React.PureComponent {
  onClick(asset, address) {
    Router.push({
      pathname: '/manage',
      query: {
        address,
        base: asset.symbol,
        quote: 'WETH',
      },
    });
  }

  render() {
    const {
      nav,
      loading,
      address,
      holdings,
      baseAsset,
      quoteAsset,
    } = this.props;

    return (
      <Holdings
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
        holdings={sortHoldings(holdings.map(mapHoldings(nav)))}
        loading={loading}
        onClick={asset => this.onClick(asset, address)}
      />
    );
  }
}
