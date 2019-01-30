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
        variables: props.values && {
          id: props.values.id,
          exchange: props.values.exchange,
          buyToken:
            props.values.type === 'Buy'
              ? props.values.quantity.token.symbol
              : props.values.total.token.symbol,
          buyQuantity:
            props.values.type === 'Buy'
              ? props.values.quantity.quantity.toString()
              : props.values.total.quantity.toString(),
          sellToken:
            props.values.type === 'Buy'
              ? props.values.total.token.symbol
              : props.values.quantity.token.symbol,
          sellQuantity:
            props.values.type === 'Buy'
              ? props.values.total.quantity.toString()
              : props.values.quantity.quantity.toString(),
        },
      }}
      execute={{
        mutation: ExecuteTakeOrderMutation,
        variables: props.values && {
          exchange: props.values.exchange,
        },
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
