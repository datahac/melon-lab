import { compose, withPropsOnChange } from 'recompose';
import OpenOrders from '@melonproject/manager-components/components/OpenOrders';
import { withRouter } from 'next/router';
import { OpenOrdersQuery, OpenOrdersMutation } from './data/openOrders';
import { extractQueryParam } from '~/utils/parseUrl';

const withMappedOrders = withPropsOnChange(['orders'], props => ({
  // TODO: Add isManager and isReadyToTrade
  isManager: false,
  isReadyToTrade: true,
  orders: props.orders.map(order => ({
    ...order,
    price: order.price,
    buyHowMuch: order.buy.howMuch,
    buySymbol: order.buy.symbol,
    sellHowMuch: order.sell.howMuch,
    sellSymbol: order.sell.symbol,
    timestamp: order.timestamp,
    type: order.type,
  })),
}));

const getAddress = extractQueryParam('address');

const withOpenOrders = BaseComponent => baseProps => (
  <OpenOrdersQuery address={getAddress(baseProps.router.asPath)}>
    {openOrdersProps => (
      <OpenOrdersMutation>
        {cancelOrder => (
          <BaseComponent
            {...baseProps}
            orders={
              (openOrdersProps.data && openOrdersProps.data.openOrders) || []
            }
            loading={openOrdersProps.loading}
            onClick={(orderId, makerAssetSymbol, takerAssetSymbol) =>
              cancelOrder({
                variables: {
                  orderId,
                  fundAddress: getAddress(baseProps.router.asPath),
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

export default compose(
  withRouter,
  withOpenOrders,
  withMappedOrders,
)(OpenOrders);
