import React, { Fragment } from 'react';
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
import Link from '~/blocks/Link';
import { withApollo } from 'react-apollo';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { SetupConsumer } from '+/components/SetupContext';
import withForm from './withForm';
import FundSetupBegin from '+/components/FundSetupBegin';
import FundSetupStep from '+/components/FundSetupStep';
import FundSetupComplete from '+/components/FundSetupComplete';

const SetupFormContainer = withForm(props => (
  <SetupForm
    handleSubmit={
      props.steps.length - 1 === props.page
        ? props.handleSubmit
        : props.onClickNext
    }
  >
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
            props.configuration.melonContracts.priceSource
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
          onClick: () => props.submitForm(),
        }}
      >
        <StepOverview
          {...props}
          availableExchangeContracts={availableExchangeContracts}
        />
      </WizardPage>
    </Wizard>
  </SetupForm>
));

class Setup extends React.Component {
  state = {
    values: undefined,
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

  setFundValues = values => {
    this.setState({
      values,
    });
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
          <FundManagerConsumer />,
          <SetupConsumer />,
        ]}
      >
        {([account, configuration, manager, setup]) => (
          <Fragment>
            <FundSetupBegin
              progress={!manager.fund}
              values={this.state.values}
              update={manager.update}
              setFundValues={this.setFundValues}
            />

            {!!setup.routes && setup.isInProgress && (
              <FundSetupStep
                progress={!!manager.fund && !setup.isComplete}
                update={setup.update}
                routes={setup.routes}
              />
            )}

            <FundSetupComplete
              progress={
                !setup.isInProgress && !setup.isComplete && !!manager.fund
              }
              fund={manager.fund}
              update={setup.update}
            />

            {!manager.fund && (
              <SetupFormContainer
                {...this.props}
                account={account}
                configuration={configuration}
                page={this.state.page}
                setPage={this.setPage}
                steps={this.state.steps}
                setShowModal={this.setShowModal}
                setFundValues={this.setFundValues}
                showModal={this.state.showModal}
                validateOnBlur={true}
                validateOnChange={false}
              />
            )}
          </Fragment>
        )}
      </Composer>
    );
  }
}

export default compose(
  withRouter,
  withApollo,
)(Setup);

// Begin
// - fund === false

// Step
// - fund === true
// - IsInProgress === true

// End
// - fund === true
