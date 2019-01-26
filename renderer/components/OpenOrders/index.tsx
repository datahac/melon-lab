import React from 'react';
import { withPropsOnChange } from 'recompose';
import OpenOrders from '~/components/OpenOrders';
import { OpenOrdersQuery } from './data/openOrders';
import * as R from 'ramda';
import CancelOrder from '../CancelOrder';

// TODO: This mapping shouldn't be necessary?
const withMappedOrders = withPropsOnChange(['orders'], props => {
  return {
    orders: props.orders.map(order => {
      const buy = order.type === 'ASK' ? order.trade.quote : order.trade.base;
      const sell = order.type === 'ASK' ? order.trade.base : order.trade.quote;

      return {
        ...order,
        timestamp: order.metadata.timestamp,
        buyHowMuch: buy.quantity,
        buySymbol: buy.token.symbol,
        sellHowMuch: sell.quantity,
        sellSymbol: sell.token.symbol,
      };
    }),
  };
});

const OpenOrdersMapped = withMappedOrders(OpenOrders);

export default class OpenOrdersContainer extends React.Component {
  state = { selectedOrder: null };

  render() {
    return (
      <OpenOrdersQuery fundAddress={this.props.address}>
        {props => {
          const orders = R.pathOr([], ['data', 'openOrders'])(props);

          return (
            <React.Fragment>
              <OpenOrdersMapped
                {...this.props}
                orders={orders}
                loading={props.loading}
                onClick={orderId => {
                  this.setState({
                    selectedOrder: {
                      id: orderId,
                    },
                  });
                }}
              />
              <CancelOrder
                values={this.state.selectedOrder}
                refresh={() => props.refetch(props.variable)}
                unset={() => this.setState({ selectedOrder: null })}
              />
            </React.Fragment>
          );
        }}
      </OpenOrdersQuery>
    );
  }
}
