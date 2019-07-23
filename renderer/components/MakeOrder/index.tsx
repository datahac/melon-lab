import * as R from 'ramda';
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
            ? R.path(['values', 'price', 'base', 'token', 'symbol'], props)
            : R.path(['values', 'price', 'quote', 'token', 'symbol'], props),
        sellToken:
          props.values.type === 'Buy'
            ? R.path(['values', 'price', 'quote', 'token', 'symbol'], props)
            : R.path(['values', 'price', 'base', 'token', 'symbol'], props),
        buyQuantity:
          props.values.type === 'Buy'
            ? R.pathOr('', ['values', 'quantity', 'quantity'], props).toString()
            : R.pathOr('', ['values', 'total', 'quantity'], props).toString(),
        sellQuantity:
          props.values.type === 'Buy'
            ? R.pathOr('', ['values', 'total', 'quantity'], props).toString()
            : R.pathOr('', ['values', 'quantity', 'quantity'], props).toString(),
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
