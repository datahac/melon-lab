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
      variables: () => ({
        id: props.values.id,
        fillQuantity:
          props.values.type === 'Buy'
            ? props.values.total.quantity.toString()
            : props.values.quantity.quantity.toString(),
      }),
    }}
    execute={{
      mutation: executeTakeOasisDexOrderMutation,
      variables: (_, transaction) => transaction,
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
