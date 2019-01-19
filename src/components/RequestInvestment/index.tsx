import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateRequestInvestmentMutation = gql`
  mutation EstimateRequestInvestment(
    $investmentAmount: String!
    $fundAddress: String!
  ) {
    estimate: estimateRequestInvestment(
      investmentAmount: $investmentAmount
      fundAddress: $fundAddress
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

const executeRequestInvestmentMutation = gql`
  mutation ExecuteRequestInvestment(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $fundAddress: String!
  ) {
    execute: executeRequestInvestment(
      fundAddress: $fundAddress
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
    text="The following method on the Melon Smart Contracts will be executed: requestInvestment"
    open={!!props.values && props.step === 1}
    estimate={{
      mutation: estimateRequestInvestmentMutation,
      variables: () => ({
        fundAddress: props.fundAddress,
        investmentAmount: props.values.total.quantity.toString(),
      }),
    }}
    execute={{
      mutation: executeRequestInvestmentMutation,
      variables: (_, transaction) => ({
        ...transaction,
        fundAddress: props.fundAddress,
      }),
      onCompleted: () => {
        props.setStep(2);
      },
    }}
    handleCancel={() => {
      props.setStep(null);
    }}
  />
);
