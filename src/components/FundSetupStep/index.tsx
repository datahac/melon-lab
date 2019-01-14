import React from 'react';
import * as R from 'ramda';
import ModalTransactions from '+/components/ModalTransactions';
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
  <ModalTransactions
    text={`The following method on the Melon Smart Contracts will be executed:`}
    open={props.progress}
    estimations={[
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_ACCOUNTING',
        }),
        isComplete: !!props.routes.accountingAddress,
        name: 'createAccounting',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_FEE_MANAGER',
        }),
        isComplete: !!props.routes.feeManagerAddress,
        name: 'createFeeManager',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_PARTICIPATION',
        }),
        isComplete: !!props.routes.participationAddress,
        name: 'createParticipation',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_POLICY_MANAGER',
        }),
        isComplete: !!props.routes.policyManagerAddress,
        name: 'createPolicyManager',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_SHARES',
        }),
        isComplete: !!props.routes.sharesAddress,
        name: 'createShares',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_TRADING',
        }),
        isComplete: !!props.routes.tradingAddress,
        name: 'createTrading',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_VAULT',
        }),
        isComplete: !!props.routes.vaultAddress,
        name: 'createVault',
      },
    ]}
    executions={[
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_ACCOUNTING',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              accountingAddress: R.path(['data', 'execute'], result),
            },
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_FEE_MANAGER',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              feeManagerAddress: R.path(['data', 'execute'], result),
            },
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_PARTICIPATION',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              participationAddress: R.path(['data', 'execute'], result),
            },
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_POLICY_MANAGER',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              policyManagerAddress: R.path(['data', 'execute'], result),
            },
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_SHARES',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              sharesAddress: R.path(['data', 'execute'], result),
            },
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_TRADING',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              tradingAddress: R.path(['data', 'execute'], result),
            },
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: (_, transaction) => ({
          ...transaction,
          step: 'CREATE_VAULT',
        }),
        update: (cache, result) => {
          props.update(cache, {
            routes: {
              vaultAddress: R.path(['data', 'execute'], result),
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
