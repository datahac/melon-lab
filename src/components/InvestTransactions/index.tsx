import React from 'react';
import ModalTransactions from '+/components/ModalTransactions';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

const estimateApproveTransferMutation = gql`
  mutation EstimateApproveTransfer(
    $investmentAmount: String!
    $fundAddress: String!
  ) {
    estimate: estimateApproveTransfer(
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
    ) @sign @account
  }
`;

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

const estimateExecuteRequestMutation = gql`
  mutation EstimateExecuteRequest($fundAddress: String!) {
    estimate: estimateExecuteRequest(fundAddress: $fundAddress) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeExecuteRequestMutation = gql`
  mutation ExecuteExecuteRequest(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $fundAddress: String!
  ) {
    execute: executeExecuteRequest(
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

export default withRouter(props => (
  <ModalTransactions
    text={`The following method on the Melon Smart Contracts will be executed:`}
    open={!!props.values && !!props.step}
    estimations={[
      {
        mutation: estimateApproveTransferMutation,
        variables: () => ({
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        }),
        isComplete: props.step > 1,
        name: 'approveTransfer',
      },
      {
        mutation: estimateRequestInvestmentMutation,
        variables: () => ({
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        }),
        isComplete: props.step > 2,
        name: 'requestInvestment',
      },
      {
        mutation: estimateExecuteRequestMutation,
        variables: () => ({
          fundAddress: props.fundAddress,
        }),
        name: 'executeRequest',
      },
    ]}
    executions={[
      {
        mutation: executeApproveTransferMutation,
        variables: (_, transaction) => ({
          ...transaction,
          fundAddress: props.fundAddress,
          investmentAmount: props.values.total.quantity.toString(),
        }),
        update: (cache, result) => {
          props.setStep(2);
        },
      },
      {
        mutation: executeRequestInvestmentMutation,
        variables: (_, transaction) => ({
          ...transaction,
          fundAddress: props.fundAddress,
        }),
        update: (cache, result) => {
          props.setStep(3);
        },
      },
      {
        mutation: executeExecuteRequestMutation,
        variables: (_, transaction) => ({
          ...transaction,
          fundAddress: props.fundAddress,
        }),
        update: cache => {
          props.setStep(null);
          // onCompleted is not working because of render
          props.router.push({
            pathname: '/manage',
            query: {
              address: props.fundAddress,
            },
          });
        },
      },
    ]}
    handleCancel={() => {
      props.router.push({
        pathname: '/wallet',
      });
    }}
  />
));
