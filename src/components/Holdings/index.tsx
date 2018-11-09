import Holdings from '~/components/Holdings';
import { compose, withPropsOnChange, withHandlers } from 'recompose';
import * as R from 'ramda';
import { withRouter } from 'next/router';
import { toBigNumber } from '~/utils/functionalBigNumber';

// TODO: Add isReadyToTrade

const withHoldingHandlers = withHandlers({
  onClick: props => asset => {
    props.router.push({
      pathname: '/manage',
      query: { address: props.address, base: asset.symbol, quote: 'WETH-T' },
    });
  },
});

const mapHoldings = R.curryN(2, (nav, asset) => ({
  ...asset,
  price: asset.price,
  fraction:
    asset &&
    nav &&
    toBigNumber(asset.balance)
      .times(asset.price)
      .div(nav.toString() || 1)
      .times(100),
  balance: asset.balance,
}));

const sortHoldings = R.sortWith([
  R.comparator((a, b) =>
    R.gt(parseInt(R.prop('fraction', a)), parseInt(R.prop('fraction', b))),
  ),
  R.ascend(R.prop('symbol')),
]);

const withMappedProps = withPropsOnChange(
  ['holdings', 'nav', 'loading'],
  props => ({
    holdings:
      (!props.loading &&
        props.holdings &&
        sortHoldings(props.holdings.map(mapHoldings(props.nav)))) ||
      [],
  }),
);

export default compose(
  withRouter,
  withMappedProps,
  withHoldingHandlers,
)(Holdings);
