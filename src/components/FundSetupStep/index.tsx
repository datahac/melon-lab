import React from 'react';
import ModalTransaction from '+/components/ModalTransaction';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';

const steps = {
  CREATE_ACCOUNTING: 'createAccounting',
  CREATE_FEE_MANAGER: 'createFeeManager',
  CREATE_PARTICIPATION: 'createParticipation',
  CREATE_POLICY_MANAGER: 'createPolicyManager',
  CREATE_SHARES: 'createShares',
  CREATE_TRADING: 'createTrading',
  CREATE_VAULT: 'createVault',
};

const estimateFundSetupStepMutation = gql`
  mutation EstimateFundSetupStep($step: FundSetupStepEnum!) {
    estimate: estimateFundSetupStep(step: $step) @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeFundSetupStepMutation = gql`
  mutation ExecuteFundSetupStep(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
    $step: FundSetupStepEnum!
  ) {
    execute: executeFundSetupStep(
      step: $step
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
    text={`The following method on the Melon Smart Contracts will be executed: ${
      Object.values(steps)[props.step - 2]
    }`}
    open={props.progress === props.step - 1}
    estimate={{
      mutation: estimateFundSetupStepMutation,
      variables: () => ({
        step: Object.keys(steps)[props.step - 2],
      }),
    }}
    execute={{
      mutation: executeFundSetupStepMutation,
      variables: (_, transaction) => ({
        ...transaction,
        step: Object.keys(steps)[props.step - 2],
      }),
      update: cache => {
        props.update(cache, {
          step: props.step,
        });
      },
    }}
    handleCancel={() => {
      props.router.push({
        pathname: '/wallet',
      });
    }}
  />
));
