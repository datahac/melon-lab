import React from 'react';
import { EstimateSetupMutation, ExecuteSetupMutation } from './data/fund';
import { withRouter } from 'next/router';
import { compose, withState, withHandlers, withProps } from 'recompose';
import availableExchangeContracts from '~/utils/availableExchangeContracts';
import availablePolicies from '~/utils/availablePolicies';
import Wizard from '~/components/Wizard';
import WizardPage from '~/components/WizardPage';
import StepFund from '~/components/SetupForm/StepFund';
import StepRiskProfile from '~/components/SetupForm/StepRiskProfile';
import StepTerms from '~/components/SetupForm/StepTerms';
import StepOverview from '~/components/SetupForm/StepOverview';
import SetupForm from '~/components/SetupForm';
// import StepFeeStructure from '~/components/SetupForm/StepFeeStructure';
import FeeFormModal from '+/components/FeeFormModal';
import Link from '~/blocks/Link';
import { withApollo } from 'react-apollo';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import withForm from './withForm';

const withFormProps = withProps(props => {
  return {
    steps: [
      {
        key: 'fund',
        name: 'Fund',
        validateFields: ['name', 'exchanges'],
      },
      // {
      //   key: 'fee-structure',
      //   name: 'Fee structure',
      // },
      {
        key: 'risk-profile',
        name: 'Risk Profile',
      },
      {
        key: 'terms-conditions',
        name: 'Terms & Conditions',
        validateFields: ['terms'],
      },
      {
        key: 'overview',
        name: 'Overview',
      },
    ],
  };
});

const withConfirmationModal = withState('showModal', 'setShowModal', false);
const withPageState = withState('page', 'setPage', 0);

const FormikSetupFormWizard = compose(withForm)(props => (
  <SetupForm handleSubmit={props.handleSubmit}>
    <Wizard page={props.page} steps={props.steps} loading={props.loading}>
      <WizardPage
        onClickNext={props.onClickNext}
        FirstAction={Link}
        FirstActionProps={{
          children: 'Cancel',
          style: 'secondary',
          size: 'medium',
          href: {
            pathname: '/wallet',
          },
        }}
      >
        <StepFund
          {...props}
          canonicalPriceFeedAddress={
            props.configuration.canonicalPriceFeedAddress
          }
          noComplianceAddress={props.configuration.noComplianceAddress}
          availableExchangeContracts={availableExchangeContracts}
        />
      </WizardPage>
      {/* <WizardPage
        onClickNext={props.onClickNext}
        onClickPrev={props.onClickPrev}
      >
        <StepFeeStructure {...props} />
      </WizardPage> */}
      <WizardPage
        onClickNext={props.onClickNext}
        onClickPrev={props.onClickPrev}
      >
        <StepRiskProfile
          {...props}
          activatedPolicies={props.values.policies}
          availablePolicies={availablePolicies.filter(
            availablePolicy =>
              !props.values.policies
                .map(policy => policy.val)
                .includes(availablePolicy.val),
          )}
          activatePolicy={props.onActivatePolicy}
        />
      </WizardPage>
      <WizardPage
        onClickNext={props.onClickNext}
        onClickPrev={props.onClickPrev}
      >
        <StepTerms {...props} />
      </WizardPage>
      <WizardPage
        onClickPrev={props.onClickPrev}
        LastActionProps={{
          children: 'Create Fund',
          onClick: () => {
            props.prepareSetup({
              variables: {
                name: props.values.name,
                exchanges: props.values.exchanges,
              },
            });
          },
        }}
      >
        <StepOverview
          {...props}
          availableExchangeContracts={availableExchangeContracts}
        />
        <FeeFormModal
          {...props}
          showModal={props.showModal}
          onClickConfirm={() => {
            props.submitForm();
            props.setShowModal(false);
          }}
          onClickDecline={() => {
            props.setShowModal(false);
          }}
          fees={[
            {
              // TODO: Does this still have to be a list?
              gasLimit: props.gasLimit,
            },
          ]}
        />
      </WizardPage>
    </Wizard>
  </SetupForm>
));

const SetupFormWizard = props => (
  <EstimateSetupMutation
    onCompleted={() => {
      props.setShowModal(true);
    }}
  >
    {(prepareSetup, prepareProps) => (
      <ExecuteSetupMutation
        account={props.account}
        onCompleted={result => {
          props.router.replace({
            pathname: '/manage',
            query: { address: result.executeSetupFund },
          });
        }}
      >
        {(executeSetup, executeProps) => (
          <FormikSetupFormWizard
            {...props}
            validateOnBlur={true}
            validateOnChange={false}
            prepareSetup={prepareSetup}
            executeSetup={executeSetup}
            gasLimit={prepareProps.data && prepareProps.data.estimateSetupFund}
            loading={prepareProps.loading || executeProps.loading}
          />
        )}
      </ExecuteSetupMutation>
    )}
  </EstimateSetupMutation>
);

const SetupFormContainer = compose(
  withApollo,
  withRouter,
  withConfirmationModal,
  withPageState,
  withFormProps,
)(SetupFormWizard);

export default props => (
  <Composer
    components={[
      <AccountConsumer />,
      <BalanceConsumer />,
      <ConfigurationConsumer />,
    ]}
  >
    {([account, balances, configuration]) => {
      return (
        <SetupFormContainer
          {...props}
          account={account}
          configuration={configuration}
        />
      );
    }}
  </Composer>
);
