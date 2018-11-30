import React from 'react';
import { EstimateSetupMutation, ExecuteSetupMutation } from './data/fund';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
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
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import withForm from './withForm';

const SetupFormContainer = withForm(props => (
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
          canonicalPriceFeedAddress={props.configuration.priceSource}
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
              gasLimit:
                props.estimateSetupFundProps &&
                props.estimateSetupFundProps.gas,
            },
          ]}
        />
      </WizardPage>
    </Wizard>
  </SetupForm>
));

class Setup extends React.Component {
  state = {
    page: 0,
    showModal: false,
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

  setShowModal = showModal => {
    this.setState({
      showModal,
    });
  };

  setPage = page => {
    this.setState({
      page,
    });
  };

  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <ConfigurationConsumer />,
          ({ render }) => (
            <EstimateSetupMutation
              onCompleted={() => {
                this.setShowModal(true);
              }}
            >
              {(a, b) => render([a, b])}
            </EstimateSetupMutation>
          ),
          ({ results: [account], render }) => (
            <ExecuteSetupMutation
              account={account}
              onCompleted={result => {
                this.props.router.replace({
                  pathname: '/manage',
                  query: { address: result.executeSetupFund },
                });
              }}
            >
              {(a, b) => render([a, b])}
            </ExecuteSetupMutation>
          ),
        ]}
      >
        {([
          account,
          configuration,
          [estimateSetupFund, estimateSetupFundProps],
          [executeSetupFund, executeSetupFundProps],
        ]) => {
          return (
            <SetupFormContainer
              {...this.props}
              account={account}
              configuration={configuration}
              page={this.state.page}
              setPage={this.setPage}
              steps={this.state.steps}
              setShowModal={this.setShowModal}
              showModal={this.state.showModal}
              validateOnBlur={true}
              validateOnChange={false}
              prepareSetup={estimateSetupFund}
              executeSetup={executeSetupFund}
              estimateSetupFundProps={
                estimateSetupFundProps.data &&
                estimateSetupFundProps.data.estimateSetupFund
              }
              loading={
                executeSetupFundProps.loading || executeSetupFundProps.loading
              }
            />
          );
        }}
      </Composer>
    );
  }
}

export default compose(
  withRouter,
  withApollo,
)(Setup);
