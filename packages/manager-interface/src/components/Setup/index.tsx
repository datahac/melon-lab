import React from 'react';
import Setup from '~/components/Setup';
import SetupForm from '+/components/SetupForm';
import FeeFormModal from '+/components/FeeFormModal';
import { EstimateSetupMutation, ExecuteSetupMutation } from './data/fund';
import { compose, withState } from 'recompose';
import { withRouter } from 'next/router';
import availableExchangeContracts from '~/utils/availableExchangeContracts';

const withProgress = withState(
  'setupProgress',
  'setSetupProgress',
  'TERMS_AND_CONDITIONS',
);

const withSetup = BaseComponent => baseProps => (
  <EstimateSetupMutation
    onCompleted={() => baseProps.setSetupProgress('CONFIRM_FUND_SETUP')}
  >
    {(prepareSetup, prepareProps) => (
      <ExecuteSetupMutation
        account={baseProps.account}
        onCompleted={() =>
          baseProps.router.replace({
            pathname: '/manage',
            query: { address: '' /* TODO: Add address */ },
          })
        }
      >
        {(executeSetup, executeProps) => (
          <BaseComponent
            network={baseProps.network}
            address={baseProps.account}
            balances={{
              eth: baseProps.eth,
              mln: baseProps.mln,
            }}
            FeeFormModal={FeeFormModal}
            FeeFormModalProps={{
              showModal:
                !prepareProps.loading &&
                baseProps.setupProgress === 'CONFIRM_FUND_SETUP',
              onClickConfirm: () =>
                executeSetup({
                  variables: {
                    name: 'test',
                    exchanges: availableExchangeContracts.map(
                      item => item.value,
                    ),
                    gasPrice: 2000,
                    gasLimit:
                      prepareProps.data && prepareProps.data.estimateSetupFund,
                  },
                }),
              onClickDecline: () =>
                baseProps.router.replace({ pathname: '/wallet' }),
              fees: [],
            }}
            SetupForm={SetupForm}
            SetupFormProps={{
              canonicalPriceFeedAddress: baseProps.canonicalPriceFeedAddress,
              competitionComplianceAddress:
                baseProps.competitionComplianceAddress,
              noComplianceAddress: baseProps.noComplianceAddress,
              availableExchangeContracts,
              onSubmit: values => {
                prepareSetup({
                  variables: {
                    name: values.name,
                    exchanges: availableExchangeContracts.map(
                      item => item.value,
                    ),
                  },
                });
              },
            }}
            loading={prepareProps.loading || executeProps.loading}
          />
        )}
      </ExecuteSetupMutation>
    )}
  </EstimateSetupMutation>
);

export default compose(
  withRouter,
  withProgress,
  withSetup,
)(Setup);
