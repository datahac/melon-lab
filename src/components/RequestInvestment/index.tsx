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
    ) @from {
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
    ) @sign @from
  }
`;

export default props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: requestInvestment"
    open={!!props.values && props.approved}
    estimate={{
      mutation: estimateRequestInvestmentMutation,
      variables: () => ({
        fundAddress: props.fundAddress,
        investmentAmount: props.values.quantity,
      }),
    }}
    execute={{
      mutation: executeRequestInvestmentMutation,
      variables: (_, transaction) => ({
        ...transaction,
        fundAddress: props.fundAddress,
      }),
    }}
    handleCancel={() => props.setInvestValues(null)}
  />
);
