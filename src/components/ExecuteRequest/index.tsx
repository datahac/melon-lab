import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';

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
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: executeRequest"
    open={props.step === 2}
    estimate={{
      mutation: estimateExecuteRequestMutation,
      variables: () => ({
        fundAddress: props.fundAddress,
      }),
    }}
    execute={{
      mutation: executeExecuteRequestMutation,
      variables: (_, transaction) => ({
        ...transaction,
        fundAddress: props.fundAddress,
      }),
      update: () => {
        props.setStep(3);
      },
      onCompleted: () => {
        props.router.push({
          pathname: '/manage',
          query: {
            address: props.fundAddress,
          },
        });
      },
    }}
    handleCancel={() => {
      props.setStep(null);
    }}
  />
));
