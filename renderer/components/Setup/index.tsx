import React, { Fragment } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import Wizard from '~/components/Wizard';
import WizardPage from '~/components/WizardPage';
import StepFund from '~/components/SetupForm/StepFund';
import StepRiskProfile from '~/components/SetupForm/StepRiskProfile';
import StepTerms from '~/components/SetupForm/StepTerms';
import StepOverview from '~/components/SetupForm/StepOverview';
import SetupForm from '~/components/SetupForm';
import StepFeeStructure from '~/components/SetupForm/StepFeeStructure';
import Link from '~/blocks/Link';
import { withApollo } from 'react-apollo';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { SetupConsumer } from '+/components/SetupContext';
import withForm from './withForm';
import SetupTransactions from '+/components/SetupTransactions';
import PoliciesTransactions from '+/components/PoliciesTransactions';
import * as R from 'ramda';
import availablePolicies from '~/shared/utils/availablePolicies';
import availableExchangeContracts from '~/shared/utils/availableExchangeContracts';
import { TokensQuery } from './data/tokens';

const SetupFormContainer = withForm(props => {
  const tokens =
    props.tokens &&
    props.tokens.reduce((carry, current) => {
      return carry.concat([
        {
          value: current.symbol,
          label: current.symbol,
        },
      ]);
    }, []);

  return (
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
          <StepFund {...props} />
        </WizardPage>
        <WizardPage
          onClickNext={props.onClickNext}
          onClickPrev={props.onClickPrev}
        >
          <StepFeeStructure {...props} />
        </WizardPage>
        <WizardPage
          onClickNext={props.onClickNext}
          onClickPrev={props.onClickPrev}
        >
          <StepRiskProfile
            {...props}
            onActivatePolicy={props.onActivatePolicy}
            availablePolicies={availablePolicies(tokens)}
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
            availablePolicies={availablePolicies()}
          />
        </WizardPage>
      </Wizard>
    </SetupForm>
  );
});

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
      {
        key: 'fee-structure',
        name: 'Fee structure',
        validateFields: ['fees.performanceFee', 'fees.managementFee'],
      },
      {
        key: 'risk-profile',
        name: 'Risk Profile',
        validateFields: [
          'policies.priceTolerance',
          'policies.maxPositions',
          'policies.maxConcentration',
          'policies.assetWhitelist',
          'policies.assetWhitelist',
          'policies.assetWhitelist',
        ],
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
            <SetupTransactions
              progress={
                (setup.setupBegin && !!this.state.values) ||
                setup.setupInProgress ||
                setup.setupComplete
              }
              values={this.state.values}
              update={manager.update}
              updateSetup={setup.update}
              routes={manager.routes}
              fund={manager.fund}
              setup={setup}
            />

            <PoliciesTransactions
              progress={
                !R.isEmpty(R.path(['state', 'values', 'policies'], this)) &&
                setup.isComplete &&
                !!manager.fund
              }
              values={this.state.values}
              fund={manager.fund}
            />

            {(!!this.state.values || !manager.fund) && (
              <TokensQuery>
                {queryProps => (
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
                    tokens={R.path(['data', 'tokens'], queryProps)}
                  />
                )}
              </TokensQuery>
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
