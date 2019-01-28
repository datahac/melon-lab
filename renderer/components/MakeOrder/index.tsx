import ModalTransaction from '+/components/ModalTransaction';
import React from 'react';
import {
  estimateMakeOrderMutation,
  executeMakeOrderMutation,
} from '~/queries/oasisDex.gql';

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: makeOrder"
    open={!!props.values && props.values.strategy === 'Limit'}
    estimate={{
      mutation: estimateMakeOrderMutation,
      variables: props.values && {
        exchange: props.values.exchange,
        buyToken:
          props.values.type === 'Buy'
            ? props.values.price.base.token.symbol
            : props.values.price.quote.token.symbol,
        sellToken:
          props.values.type === 'Buy'
            ? props.values.price.quote.token.symbol
            : props.values.price.base.token.symbol,
        buyQuantity:
          props.values.type === 'Buy'
            ? props.values.quantity.quantity.toString()
            : props.values.total.quantity.toString(),
        sellQuantity:
          props.values.type === 'Buy'
            ? props.values.total.quantity.toString()
            : props.values.quantity.quantity.toString(),
      },
    }}
    execute={{
      mutation: executeMakeOrderMutation,
      variables: props.values && {
        exchange: props.values.exchange,
      },
      refetchQueries: () => ['OrdersQuery', 'OpenOrdersQuery'],
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
