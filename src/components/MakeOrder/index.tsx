import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

const estimateMakeOrderMutation = gql`
  mutation EstimateMakeOrder(
    $exchange: ExchangeEnum!
    $buyToken: String!
    $buyQuantity: String!
    $sellToken: String!
    $sellQuantity: String!
  ) {
    estimate: estimateMakeOrder(
      exchange: $exchange
      buyToken: $buyToken
      buyQuantity: $buyQuantity
      sellToken: $sellToken
      sellQuantity: $sellQuantity
    ) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeMakeOrderMutation = gql`
  mutation ExecuteMakeOrder(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $exchange: ExchangeEnum!
  ) {
    execute: executeMakeOrder(
      exchange: $exchange
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
    ) @sign @account {
      id
      trade {
        base {
          token {
            symbol
          }
        }
        quote {
          token {
            symbol
          }
        }
      }
      price
      volume
      type
      exchange
    }
  }
`;

export default withRouter(props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: makeOrder"
    open={!!props.values && props.values.strategy === 'Limit'}
    estimate={{
      mutation: estimateMakeOrderMutation,
      variables: () => ({
        // TODO: Add echange selector
        exchange: 'OASIS_DEX',
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
        // TODO: Add echange selector
        exchange: 'OASIS_DEX',
      }),
      onCompleted: values => {
        props.resetForm();
        props.setOrderFormValues(null);
      },
    }}
    handleCancel={() => {
      props.setOrderFormValues(null);
    }}
  />
));
