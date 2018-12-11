import React from 'react';
import { withRouter } from 'next/router';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';

const estimateSetupFundMutation = gql`
  mutation EstimateSetupFund {
    estimate: estimateSetupFund @from {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeSetupFundMutation = gql`
  mutation ExecuteSetupFund(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeSetupFund(
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

export default withRouter(props => (
  <ModalTransaction
    text="The following method on the Melon Smart Contracts will be executed: setupFund"
    open={props.step === 2}
    estimate={{
      mutation: estimateSetupFundMutation,
    }}
    execute={{
      mutation: executeSetupFundMutation,
      update: cache => {
        props.update(cache, {
          step: 3,
        });
      },
      onCompleted: () => {
        props.router.replace({
          pathname: '/manage',
          query: {
            address: props.fund,
          },
        });
      },
    }}
  />
));
