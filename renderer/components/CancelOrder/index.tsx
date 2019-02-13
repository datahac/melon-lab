import ModalTransaction from '../ModalTransaction';

import {
  EstimateCancelOrderMutation,
  ExecuteCancelOrderMutation,
} from '~/queries/cancelOrder.gql';

export default props => {
  return (
    <ModalTransaction
      text="The following method on the Melon Smart Contracts will be executed: cancelOrder"
      step="cancelOrder"
      open={!!props.values}
      estimate={{
        mutation: EstimateCancelOrderMutation,
        variables: {
          exchange: props.values && props.values.exchange,
          id: props.values && props.values.id,
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
};
