import ModalTransaction from '../ModalTransaction';

import {
  EstimateCancelOrderMutation,
  ExecuteCancelOrderMutation,
} from '~/queries/cancelOrder.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: cancelOrder"
    open={!!props.values}
    estimate={{
      mutation: EstimateCancelOrderMutation,
      exchange: 'OASIS_DEX',
      variables: {
        id: props.values,
      },
    }}
    execute={{
      mutation: ExecuteCancelOrderMutation,
      variables: props.values && {
        exchange: props.values.exchange,
      },
      refetchQueries: () => ['OrdersQuery', 'OpenOrdersQuery'],
      onCompleted: () => {
        props.setSelectedOrder(null);
      },
    }}
    handleCancel={() => {
      props.setSelectedOrder(null);
    }}
  />
);
