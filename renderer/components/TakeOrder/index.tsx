import ModalTransaction from '+/components/ModalTransaction';
import React from 'react';

import {
  estimateTakeOasisDexOrderMutation,
  executeTakeOasisDexOrderMutation,
} from '~/queries/oasisDex.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: takeOrder"
    open={!!props.values && props.values.strategy === 'Market'}
    estimate={{
      mutation: estimateTakeOasisDexOrderMutation,
      variables: !!props.values
        ? {
            id: props.values.id,
            fillQuantity:
              props.values.type === 'Buy'
                ? props.values.total.quantity.toString()
                : props.values.quantity.quantity.toString(),
          }
        : {},
    }}
    execute={{
      mutation: executeTakeOasisDexOrderMutation,
      refetchQueries: () => ['HoldingsQuery', 'OrdersQuery', 'OpenOrdersQuery'],
      onCompleted: () => {
        props.resetForm();
        props.setOrderFormValues(null);
      },
    }}
    handleCancel={() => {
      props.setOrderFormValues(null);
    }}
  />
);
