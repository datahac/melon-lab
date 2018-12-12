import React from 'react';
import * as R from 'ramda';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateCreateComponentsMutation = gql`
  mutation EstimateCreateComponents($name: String!, $exchanges: [String]!) {
    estimate: estimateCreateComponents(name: $name, exchanges: $exchanges)
      @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeCreateComponentsMutation = gql`
  mutation ExecuteCreateComponents(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeCreateComponents(
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
    text="The following method on the Melon Smart Contracts will be executed: createComponents"
    open={!!props.values && props.step === 0}
    estimate={{
      mutation: estimateCreateComponentsMutation,
      variables: () => ({
        name: props.values.name,
        exchanges: props.values.exchanges,
      }),
    }}
    execute={{
      mutation: executeCreateComponentsMutation,
      update: (cache, result) => {
        props.update(cache, {
          step: 1,
          fund: R.path(['data', 'execute'], result),
        });
      },
    }}
    handleCancel={() => props.setFundValues(null)}
  />
);
