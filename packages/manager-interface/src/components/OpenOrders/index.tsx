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

const OpenOrdersContainer = ({ address, ...props }) => (
  <OpenOrdersQuery address={address}>
    {openOrdersProps => (
      <OpenOrdersMutation>
        {cancelOrder => (
          <OpenOrdersMapped
            {...props}
            orders={R.pathOr([], ['data', 'openOrders'])(openOrdersProps)}
            loading={openOrdersProps.loading}
            onClick={(orderId, makerAssetSymbol, takerAssetSymbol) =>
              cancelOrder({
                variables: {
                  orderId,
                  fundAddress: address,
                  makerAssetSymbol,
                  takerAssetSymbol,
                },
              })
            }
          />
        )}
      </OpenOrdersMutation>
    )}
  </OpenOrdersQuery>
);

export default OpenOrdersContainer;
