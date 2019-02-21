import ModalTransactions from '+/components/ModalTransactions';
import { withRouter } from 'next/router';
import * as R from 'ramda';
import React from 'react';

import {
  estimateFundSetupBeginMutation,
  estimateFundSetupCompleteMutation,
  estimateFundSetupStepMutation,
  executeFundSetupBeginMutation,
  executeFundSetupCompleteMutation,
  executeFundSetupStepMutation,
} from '~/queries/fundSetup.gql';

export default withRouter(props => (
  <ModalTransactions
    text={`The following method on the Melon Smart Contracts will be executed:`}
    open={props.progress}
    estimations={[
      {
        mutation: estimateFundSetupBeginMutation,
        variables: props.values && {
          name: R.path(['values', 'name'], props),
          exchanges: R.path(['values', 'exchanges'], props),
          performanceFee: R.path(
            ['values', 'fees', 'performanceFee'],
            props,
          ).toString(),
          managementFee: R.path(
            ['values', 'fees', 'managementFee'],
            props,
          ).toString(),
          feePeriod: R.path(['values', 'fees', 'feePeriod'], props).toString(),
          assets: R.path(['values', 'assets'], props),
        },
        isComplete: !!props.fund,
        name: 'setupBegin',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_ACCOUNTING',
        },
        isComplete: R.pathOr(false, ['routes', 'accountingAddress'], props),
        name: 'createAccounting',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_FEE_MANAGER',
        },
        isComplete: R.pathOr(false, ['routes', 'feeManagerAddress'], props),
        name: 'createFeeManager',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_PARTICIPATION',
        },
        isComplete: R.pathOr(false, ['routes', 'participationAddress'], props),
        name: 'createParticipation',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_POLICY_MANAGER',
        },
        isComplete: R.pathOr(false, ['routes', 'policyManagerAddress'], props),
        name: 'createPolicyManager',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_SHARES',
        },
        isComplete: R.pathOr(false, ['routes', 'sharesAddress'], props),
        name: 'createShares',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_TRADING',
        },
        isComplete: R.pathOr(false, ['routes', 'tradingAddress'], props),
        name: 'createTrading',
      },
      {
        mutation: estimateFundSetupStepMutation,
        variables: {
          step: 'CREATE_VAULT',
        },
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
        update: (cache, result) => {
          props.update(cache, {
            fund: R.path(['data', 'execute'], result),
          });
        },
      },
      {
        mutation: executeFundSetupStepMutation,
        variables: {
          step: 'CREATE_ACCOUNTING',
        },
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
        variables: {
          step: 'CREATE_FEE_MANAGER',
        },
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
        variables: {
          step: 'CREATE_PARTICIPATION',
        },
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
        variables: {
          step: 'CREATE_POLICY_MANAGER',
        },
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
        variables: {
          step: 'CREATE_SHARES',
        },
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
        variables: {
          step: 'CREATE_TRADING',
        },
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
        variables: {
          step: 'CREATE_VAULT',
        },
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
          if (R.isEmpty(R.path(['values', 'policies'], props))) {
            props.router.push({
              pathname: '/invest',
              query: {
                address: props.fund,
              },
            });
          }
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
