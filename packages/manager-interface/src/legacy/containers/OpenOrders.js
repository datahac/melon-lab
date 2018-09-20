import moment from 'moment';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';
import { actions } from '../actions/openOrders';
import OpenOrders from '@melonproject/manager-components/components/OpenOrders';
import displayNumber from '../utils/displayNumber';
import isSameAddress from '../utils/isSameAddress';

const mapStateToProps = state => ({
  ...state.openOrders,
  orders: state.openOrders.orders.map(order => ({
    buyHowMuch: displayNumber(order.buyHowMuch),
    buySymbol: order.buySymbol,
    id: order.exchangeOrderId,
    price: displayNumber(order.price),
    sellHowMuch: displayNumber(order.sellHowMuch),
    sellSymbol: order.sellSymbol,
    timestamp: moment(order.timestamp).format('D. MMM YYYY HH:mm'),
    type: order.type,
  })),
  isReadyToTrade: state.app.isReadyToTrade,
  isManager:
    state.app.isReadyToInteract &&
    isSameAddress(state.ethereum.account, state.fund.owner),
});

const mapDispatchToProps = dispatch => ({
  getOpenOrders: () => {
    dispatch(actions.getOpenOrders());
  },
  onClick: (orderId, makerAssetSymbol, takerAssetSymbol) => {
    dispatch(actions.cancelOrder(orderId, makerAssetSymbol, takerAssetSymbol));
  },
});

const OpenOrdersWithLifecycle = lifecycle({
  componentDidMount() {
    this.props.getOpenOrders();
  },
})(OpenOrders);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OpenOrdersWithLifecycle);
