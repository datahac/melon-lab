import ModalTransactions from '+/components/ModalTransactions';
import gql from 'graphql-tag';
import { withRouter } from 'next/router';
import * as R from 'ramda';
import React from 'react';
import { estimateFundSetupBeginMutation } from '../../shared/graphql/schema/queries/estimateFundSetupBeginMutation.gql';

const executeFundSetupBeginMutation = gql`
  mutation ExecuteFundSetupBegin(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeFundSetupBegin(
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

const estimateFundSetupCompleteMutation = gql`
  mutation EstimateFundSetupComplete {
    estimate: estimateFundSetupComplete @account {
      data
      from
      gas
      gasPrice
      to
      value
    }
  }
`;

const executeFundSetupCompleteMutation = gql`
  mutation ExecuteFundSetupComplete(
    $data: String!
    $from: String!
    $gas: String!
    $gasPrice: String!
    $to: String!
    $value: String!
  ) {
    execute: executeFundSetupComplete(
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
        mutation: estimateFundSetupBeginMutation,
        variables: () => ({
          name: R.path(['values', 'name'], props),
          exchanges: R.path(['values', 'exchanges'], props),
          performanceFee: R.path(['values', 'fees', 'performanceFee'], props),
          managementFee: R.path(['values', 'fees', 'managementFee'], props),
        }),
        isComplete: !!props.fund,
        name: 'setupBegin',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_ACCOUNTING',
        }),
        isComplete: R.pathOr(false, ['routes', 'accountingAddress'], props),
        name: 'createAccounting',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_FEE_MANAGER',
        }),
        isComplete: R.pathOr(false, ['routes', 'feeManagerAddress'], props),
        name: 'createFeeManager',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_PARTICIPATION',
        }),
        isComplete: R.pathOr(false, ['routes', 'participationAddress'], props),
        name: 'createParticipation',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_POLICY_MANAGER',
        }),
        isComplete: R.pathOr(false, ['routes', 'policyManagerAddress'], props),
        name: 'createPolicyManager',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_SHARES',
        }),
        isComplete: R.pathOr(false, ['routes', 'sharesAddress'], props),
        name: 'createShares',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_TRADING',
        }),
        isComplete: R.pathOr(false, ['routes', 'tradingAddress'], props),
        name: 'createTrading',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: () => ({
          step: 'CREATE_VAULT',
        }),
        isComplete: R.pathOr(false, ['routes', 'vaultAddress'], props),
        name: 'createVault',
      },
      {
        mutation: estimateFundSetupCompleteMutation,
        isComplete:
          !!props.fund &&
          !props.setup.setupComplete &&
          !props.setup.setupInProgress,
        name: 'setupComplete',
      },
    ]}
    executions={[
      {
        mutation: executeFundSetupBeginMutation,
        variables: (_, transaction) => ({
          ...transaction,
        }),
        update: (cache, result) => {
          props.update(cache, {
            fund: R.path(['data', 'execute'], result),
          });
        },
      },
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
      {
        mutation: executeFundSetupCompleteMutation,
        update: cache => {
          props.updateSetup(cache, {
            fund: {
              isComplete: true,
            },
          });
          // onCompleted is not working because of render
          props.router.push({
            pathname: '/invest',
            query: {
              address: props.fund,
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
