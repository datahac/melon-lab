import ModalTransaction from '+/components/ModalTransaction';
import React from 'react';

import {
  EstimateTakeOrderMutation,
  ExecuteTakeOrderMutation,
} from '~/queries/takeOrder.gql';

export default props => {
  return (
    <ModalTransaction
      text="The following method on the Melon Smart Contracts will be executed: takeOrder"
      open={!!props.values && props.values.strategy === 'Market'}
      estimate={{
        mutation: EstimateTakeOrderMutation,
        variables: () => ({
          id: props.values.id,
          exchange: props.values.exchange,
          buyQuantity:
            props.values.type === 'Buy'
              ? props.values.total.quantity.toString()
              : props.values.quantity.quantity.toString(),
        }),
      }}
      execute={{
        mutation: ExecuteTakeOrderMutation,
        variables: (_, transaction) => ({
          ...transaction,
          exchange: props.values.exchange,
        }),
        refetchQueries: () => [
          'HoldingsQuery',
          'OrdersQuery',
          'OpenOrdersQuery',
        ],
        onCompleted: () => {
          props.resetForm();
          props.setOrderFormValues(null);
          props.setOrder({ exchange: props.exchange });
        },
      }}
      handleCancel={() => {
        props.setOrderFormValues(null);
      }}
    />
  );
};
