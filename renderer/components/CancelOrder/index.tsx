import ModalTransaction from '../ModalTransaction';

import {
  EstimateCancelOrderMutation,
  ExecuteCancelOasisDexOrderMutation,
} from '~/queries/cancelOrder.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: cancelOrder"
    open={!!props.values}
    estimate={{
      mutation: EstimateCancelOrderMutation,
      variables: {
        id: props.values,
      },
    }}
    execute={{
      mutation: ExecuteCancelOasisDexOrderMutation,
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
