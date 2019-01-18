import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateDeployPriceToleranceMutation = gql`
  mutation EstimateDeployPriceTolerance($percent: Int!) {
    estimate: estimateDeployPriceTolerance(percent: $percent) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeDeployPriceToleranceMutation = gql`
  mutation ExecutePriceTolerance(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeDeployPriceTolerance(
      unsigned: {
        data: $data
        from: $from
        gas: $gas
        gasPrice: $gasPrice
        to: $to
        value: $value
      }
    ) @sign @account
  }
`;

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: deployPriceTolerance"
    open={!!props.values && props.step === 0}
    estimate={{
      mutation: estimateDeployPriceToleranceMutation,
      variables: () => ({
        percent: props.values.policies.priceTolerance,
      }),
    }}
    execute={{
      mutation: executeDeployPriceToleranceMutation,
      variables: (_, transaction) => ({
        ...transaction,
        fundAddress: props.fundAddress,
        investmentAmount: props.values.total.quantity,
      }),
      onCompleted: () => {
        props.setStep(1);
      },
    }}
    handleCancel={() => {
      props.setStep(null);
    }}
  />
);
