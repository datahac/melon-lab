import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { actions } from '../actions/holdings';
import { actions as appActions } from '../actions/app';
import { actions as orderbookActions } from '../actions/orderbook';
import { actions as recentTradesActions } from '../actions/recentTrades';
import Holdings from '@melonproject/manager-components/components/Holdings';
import displayNumber from '../utils/displayNumber';

const mapStateToProps = state => ({
  holdings: state.holdings.holdings.map(asset => ({
    name: asset.name,
    balance: displayNumber(asset.balance),
    price: displayNumber(asset.price),
    percentage:
      state.fund.nav === '...'
        ? '...'
        : displayNumber(
            asset.balance
              .times(asset.price)
              .div(state.fund.nav || 1)
              .times(100),
          ),
  })),
  dataValid: state.ethereum.isDataValid,
  isReadyToTrade: state.app.isReadyToTrade,
  quoteAsset: state.app.assetPair.quote,
});

const mapDispatchToProps = dispatch => ({
  getHoldings: fundAddress => {
    dispatch(actions.getHoldings(fundAddress));
  },
  selectAsset: (asset, isReadyToTrade, quoteAsset) => {
    if (asset !== quoteAsset) {
      dispatch(appActions.updateAssetPair({ base: asset }));
      dispatch(orderbookActions.getOrderbook());
      dispatch(recentTradesActions.getRecentTrades());
      if (isReadyToTrade) {
        dispatch(appActions.scrollTo('trade'));
      } else {
        dispatch(appActions.scrollTo('orderbook'));
      }
    }
  },
});

const HoldingsWithLifecycle = lifecycle({
  componentDidMount() {
    this.props.getHoldings(this.props.fundAddress);
  },
})(Holdings);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HoldingsWithLifecycle);
