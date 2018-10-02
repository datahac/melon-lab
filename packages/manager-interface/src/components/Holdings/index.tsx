import Holdings from '~/components/Holdings';
import { compose, withPropsOnChange, withHandlers } from 'recompose';
import * as R from 'ramda';
import Router from 'next/router';
import { toBigNumber } from '~/utils/functionalBigNumber';

// TODO: Add isReadyToTrade

const withHoldingHandlers = withHandlers({
  onClick: props => asset => {
    Router.push({
      pathname: '/manage',
      query: { address: props.address, base: asset.symbol, quote: 'WETH-T' },
    });
  },
});

const mapHoldings = R.curryN(2, (nav, asset) => ({
  ...asset,
  price: asset.price,
  fraction: toBigNumber(asset.balance)
    .times(asset.price)
    .div(nav.toString() || 1)
    .times(100),
  balance: asset.balance,
}));

const withMappedProps = withPropsOnChange(
  ['holdings', 'nav', 'loading'],
  props => ({
    holdings:
      (!props.loading &&
        props.holdings &&
        props.holdings.map(mapHoldings(props.nav))) ||
      [],
  }),
);

export default compose(
  withMappedProps,
  withHoldingHandlers,
)(Holdings);
