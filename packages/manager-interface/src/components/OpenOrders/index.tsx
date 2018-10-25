import React from 'react';
import Composer from 'react-composer';
import { withPropsOnChange } from 'recompose';
import OpenOrders from '~/components/OpenOrders';
import { OpenOrdersQuery, OpenOrdersMutation } from './data/openOrders';
import * as R from 'ramda';

// TODO: This mapping shouldn't be necessary?
const withMappedOrders = withPropsOnChange(['orders'], props => ({
  orders: props.orders.map(order => ({
    ...order,
    buyHowMuch: order.buy.howMuch,
    buySymbol: order.buy.symbol,
    sellHowMuch: order.sell.howMuch,
    sellSymbol: order.sell.symbol,
  })),
}));

const OpenOrdersMapped = withMappedOrders(OpenOrders);

export default class OpenOrdersContainer extends React.PureComponent {
  render() {
    return (
      <Composer components={[
        <OpenOrdersQuery address={this.props.address} />,
        ({ render }) => (
          <OpenOrdersMutation>{(a, b) => render([a, b])}</OpenOrdersMutation>
        ),
      ]}>
        {([openOrdersProps, [cancelOrder]]) => {
          const orders = R.pathOr([], ['data', 'openOrders'])(openOrdersProps);

          return (
            <OpenOrdersMapped
              {...this.props}
              orders={orders}
              loading={openOrdersProps.loading}
              onClick={(orderId, makerAssetSymbol, takerAssetSymbol) => {
                cancelOrder({
                  variables: {
                    orderId,
                    fundAddress: this.props.address,
                    makerAssetSymbol,
                    takerAssetSymbol,
                  },
                });
              }}
            />
          );
        }}
      </Composer>
    )
  }
}
export default OpenOrdersContainer;
