import ModalTransaction from '+/components/ModalTransaction';
import { withRouter } from 'next/router';
import React from 'react';
import {
  estimateMakeOrderMutation,
  executeMakeOrderMutation,
} from '../../shared/graphql/schema/queries/oasisDex.gql';

export default withRouter(props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: makeOrder"
    open={!!props.values && props.values.strategy === 'Limit'}
    estimate={{
      mutation: estimateMakeOrderMutation,
      variables: () => ({
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
            ? props.values.quantity.quantity
            : props.values.total.quantity,
        sellQuantity:
          props.values.type === 'Buy'
            ? props.values.total.quantity
            : props.values.quantity.quantity,
      }),
    }}
    execute={{
      mutation: executeMakeOrderMutation,
      variables: (_, transaction) => ({
        ...transaction,
        exchange: props.values.exchange,
      }),
      onCompleted: () => {
        props.resetForm();
        props.setOrderFormValues(null);
      },
    }}
    handleCancel={() => {
      props.setOrderFormValues(null);
    }}
  />
));
