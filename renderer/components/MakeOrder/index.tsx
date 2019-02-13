import ModalTransaction from '+/components/ModalTransaction';
import React from 'react';
import {
  EstimateMakeOrderMutation,
  ExecuteMakeOrderMutation,
} from '~/queries/makeOrder.gql';

export default props => (
  <ModalTransaction
    step="makeOrder"
    text="The following method on the Melon Smart Contracts will be executed: makeOrder"
    open={!!props.values && props.values.strategy === 'Limit'}
    estimate={{
      mutation: EstimateMakeOrderMutation,
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
      mutation: ExecuteMakeOrderMutation,
      variables: props.values && {
        exchange: props.values.exchange,
      },
      refetchQueries: () => ['OrdersQuery', 'OpenOrdersQuery'],
      onCompleted: () => {
        props.resetForm({
          price: '',
          quantity: '',
          total: '',
          exchange: props.values.exchange,
          id: null,
          signedOrder: null,
          strategy: props.values.strategy,
          type: props.values.type,
        });
        props.setOrderFormValues(null);
      },
    }}
    handleCancel={() => {
      props.setOrderFormValues(null);
    }}
  />
);
