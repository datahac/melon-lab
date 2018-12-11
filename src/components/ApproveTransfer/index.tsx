import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateApproveTransferMutation = gql`
  mutation EstimateApproveTransfer(
    $investmentAmount: String!
    $fundAddress: String!
  ) {
    estimate: estimateApproveTransfer(
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

const executeApproveTransferMutation = gql`
  mutation ExecuteApproveTransfer(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $investmentAmount: String!
    $fundAddress: String!
  ) {
    execute: executeApproveTransfer(
      investmentAmount: $investmentAmount
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
    text="The following method on the Melon Smart Contracts will be executed: approve"
    open={!!props.values}
    estimate={{
      mutation: estimateApproveTransferMutation,
      variables: () => ({
        fundAddress: props.fundAddress,
        investmentAmount: props.values.quantity,
      }),
    }}
    execute={{
      mutation: executeApproveTransferMutation,
      variables: (_, transaction) => ({
        ...transaction,
        fundAddress: props.fundAddress,
        investmentAmount: props.values.quantity,
      }),
    }}
    handleCancel={() => props.setInvestValues(null)}
  />
);
