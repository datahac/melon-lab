import React from 'react';
import SetupForm from '+/components/SetupForm';
import FeeFormModal from '+/components/FeeFormModal';
import TermsConditionsModal from '+/components/TermsConditionsModal';
import { PrepareSetupMutation, ExecuteSetupMutation } from './data/fund';
import { compose, withState } from 'recompose';
import { withRouter } from 'next/router';

const withProgress = withState('setupProgress', 'setSetupProgress', 'TERMS_AND_CONDITIONS');

const withSetup = BaseComponent => baseProps => (
  <PrepareSetupMutation onCompleted={() => baseProps.setSetupProgress('CONFIRM_FUND_SETUP')}>
    {(prepareSetup, prepareProps) => (
    <PrepareSetupMutation onCompleted={() => baseProps.router.replace({ pathname: '/manage', query: { address: '' /* TODO: Add address */ } })}>
      {(executeSetup, executeProps) => (
        <BaseComponent
          network={baseProps.network}
          address={baseProps.account}
          balances={{
            eth: baseProps.eth,
            mln: baseProps.mln,
          }}
          availableExchanges={baseProps.availableExchanges}
          TermsConditionsModal={TermsConditionsModal}
          TermsConditionsModalProps={{
            showModal: baseProps.setupProgress === 'TERMS_AND_CONDITIONS',
            onClickConfirm: () => baseProps.setSetupProgress('PREPARE_FUND_SETUP'),
            onClickDecline: () => baseProps.router.replace({ pathname: '/wallet' }),
          }}
          FeeFormModal={FeeFormModal}
          FeeFormModalProps={{
            showModal: !prepareProps.loading && baseProps.setupProgress === 'CONFIRM_FUND_SETUP',
            onClickConfirm: () => executeSetup({ variables: { transaction: prepareProps.data && prepareProps.data.prepareSetupFund } }),
            onClickDecline: () => baseProps.router.replace({ pathname: '/wallet' }),
            fees: [],
          }}
          onClickDecline={baseProps.onClickDecline}
          signed={baseProps.signed}
          onClickAccept={baseProps.onClickAccept}
          canonicalPriceFeedAddress={baseProps.canonicalPriceFeedAddress}
          competitionComplianceAddress={baseProps.competitionComplianceAddress}
          noComplianceAddress={baseProps.noComplianceAddress}
          onSubmit={values => {
            prepareSetup({
              variables: {
                name: values.name,
                exchanges: baseProps.availableExchanges.map((item) => item.value),
              },
            })
          }}
          loading={prepareProps.loading || executeProps.loading}
        />
      )}
    </PrepareSetupMutation>
    )}
  </PrepareSetupMutation>
);

export default compose(
  withRouter,
  withProgress,
  withSetup,
)(SetupForm);
