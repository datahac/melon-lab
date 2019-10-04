import React, { Fragment, useState } from 'react';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import Wizard from '~/components/Wizard';
import WizardPage from '~/components/WizardPage';
import StepFund from '~/components/SetupForm/StepFund';
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
import * as R from 'ramda';
import availableExchangeContracts from '~/utils/availableExchangeContracts';
import { TokensQuery } from './data/tokens';
import Spinner from '~/blocks/Spinner';

const steps = [
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
    key: 'terms-conditions',
    name: 'Terms & Conditions',
    validateFields: ['terms'],
  },
  {
    key: 'overview',
    name: 'Overview',
  },
];

const SetupFormContainer = withForm(props => {
  const tokens =
    props.tokens &&
    props.tokens.reduce((carry, current) => {
      return carry.concat([
        {
          value: current.address.toLowerCase(),
          label: current.symbol,
        },
      ]);
    }, []);

  return (
    <SetupForm handleSubmit={props.steps.length - 1 === props.page ? props.handleSubmit : props.onClickNext}>
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
          <StepFund {...props} availableAssets={tokens} />
        </WizardPage>
        <WizardPage onClickNext={props.onClickNext} onClickPrev={props.onClickPrev}>
          <StepFeeStructure {...props} />
        </WizardPage>
        <WizardPage onClickNext={props.onClickNext} onClickPrev={props.onClickPrev}>
          <StepTerms {...props} />
        </WizardPage>
        <WizardPage
          onClickPrev={props.onClickPrev}
          LastActionProps={{
            children: 'Create Fund',
            onClick: () => props.submitForm(),
          }}
        >
          <StepOverview {...props} availableExchangeContracts={availableExchangeContracts} availableAssets={tokens} />
        </WizardPage>
      </Wizard>
    </SetupForm>
  );
});

const Setup = ({ ...props }) => {
  const [fundValues, setFundValues] = useState(null);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);

  return (
    <Composer components={[<AccountConsumer />, <ConfigurationConsumer />, <FundManagerConsumer />, <SetupConsumer />]}>
      {([account, configuration, manager, setup]) => (
        <Fragment>
          <SetupTransactions
            progress={(setup.setupBegin && !!fundValues) || setup.setupInProgress || setup.setupComplete}
            values={fundValues}
            update={manager.update}
            updateSetup={setup.update}
            routes={manager.routes}
            fund={manager.fund}
            setup={setup}
          />

          {(!!fundValues || !manager.fund) && (
            <TokensQuery>
              {queryProps =>
                queryProps.loading ? (
                  <div className="holdings__loading">
                    <Spinner icon />
                  </div>
                ) : (
                  <SetupFormContainer
                    {...props}
                    loading={queryProps.loading}
                    account={account}
                    configuration={configuration}
                    page={page}
                    setPage={setPage}
                    steps={steps}
                    setShowModal={setShowModal}
                    setFundValues={setFundValues}
                    showModal={showModal}
                    validateOnBlur={true}
                    validateOnChange={false}
                    tokens={R.path(['data', 'tokens'], queryProps)}
                    quoteToken={R.path(['data', 'quoteToken'], queryProps)}
                  />
                )
              }
            </TokensQuery>
          )}
        </Fragment>
      )}
    </Composer>
  );
};

export default compose(
  withRouter,
  withApollo,
)(Setup);
