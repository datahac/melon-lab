import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateContinueCreationMutation = gql`
  mutation EstimateContinueCreation {
    estimate: estimateContinueCreation @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeContinueCreationMutation = gql`
  mutation ExecuteContinueCreation(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeContinueCreation(
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
    ) @sign @from
  }
`;

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: continueCreation"
    open={props.step === 1}
    estimate={{
      mutation: estimateContinueCreationMutation,
    }}
    execute={{
      mutation: executeContinueCreationMutation,
      update: cache => {
        props.update(cache, {
          step: 2,
        });
      },
    }}
  />
);
