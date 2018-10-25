import React from 'react';
import { EstimateSetupMutation, ExecuteSetupMutation } from './data/fund';
import { withRouter } from 'next/router';
import { compose, withState, withHandlers, withProps } from 'recompose';
import { isZero } from '~/utils/functionalBigNumber';
import availableExchangeContracts from '~/utils/availableExchangeContracts';
import availablePolicies from '~/utils/availablePolicies';
import Wizard from '~/components/Wizard';
import WizardPage from '~/components/WizardPage';
import StepFund from '~/components/SetupForm/StepFund';
import InsufficientEth from '~/components/InsufficientEth';
import StepPolicies from '~/components/SetupForm/StepPolicies';
import StepTerms from '~/components/SetupForm/StepTerms';
import StepOverview from '~/components/SetupForm/StepOverview';
import SetupForm from '~/components/SetupForm';
import FeeFormModal from '+/components/FeeFormModal';
import Link from '~/blocks/Link';
import { withApollo } from 'react-apollo';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import * as Yup from 'yup';
import * as R from 'ramda';
import Composer from 'react-composer';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';

const withFormProps = withProps(props => {
  return {
    steps: [
      {
        key: 'fund',
        name: 'Fund',
        validateFields: ['name', 'exchanges'],
      },
      {
        key: 'policies',
        name: 'Policies',
      },
      {
        key: 'terms',
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

const initialValues = {
  name: '',
  exchanges: [],
  terms: false,
  gasPrice: '5',
  policies: [],
};

const withFormHandlers = withHandlers({
  onActivatePolicy: props => value => {
    const { policies } = props.values;

    if (!R.find(R.propEq('key', value.key), policies)) {
      props.setFieldValue('policies', [...policies, value]);
    } else {
      props.setFieldValue('policies', [
        ...policies.filter(item => item.key !== value.key),
      ]);
    }
  },
  onChangeExchanges: props => event => {
    const value = event.target.value;
    const { exchanges } = props.values;

    if (!exchanges.includes(value)) {
      props.setFieldValue('exchanges', [...exchanges, value]);
    } else {
      props.setFieldValue('exchanges', [
        ...exchanges.filter(item => item !== value),
      ]);
    }
  },
  onClickNext: props => e => {
    const fields = props.steps[props.page].validateFields;
    if (typeof fields !== 'undefined' && fields) {
      fields.map(item => props.setFieldTouched(item));

      props.validateForm().then(errors => {
        if (fields.some(item => errors[item])) {
          return props.setPage(props.page);
        }

        return props.setPage(props.page + 1);
      });
    }

    return props.setPage(props.page + 1);
  },
  onClickPrev: props => event => {
    return props.setPage(props.page - 1);
  },
});

const uniqueFundQuery = gql`
  query UniqueFundQuery($name: String!) {
    fundByName(name: $name) {
      address
    }
  }
`;

const withFormikForm = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: props =>
    Yup.object().shape({
      name: Yup.string()
        .required('Name is required.')
        .test(
          'is-unique',
          'There is already a fund with this name.',
          async value => {
            const { data } =
              value &&
              (await props.client.query({
                query: uniqueFundQuery,
                variables: {
                  name: value,
                },
              }));

            return !data.fundByName;
          },
        ),
      exchanges: Yup.array().required('Exchanges are required.'),
      terms: Yup.boolean().oneOf([true], 'Must Accept Terms and Conditions'),
      gasPrice: Yup.number()
        .required('Gas price is required.')
        .moreThan(0, 'Please enter a valid gas price'),
    }),
  handleSubmit: (values, form) => {
    form.props.executeSetup({
      variables: {
        name: values.name,
        exchanges: values.exchanges,
        gasPrice: values.gasPrice,
        gasLimit: form.props.gasLimit,
      },
    });
  },
});

const FormikSetupFormWizard = compose(
  withFormikForm,
  withFormHandlers,
)(props => (
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
          availableExchangeContracts={availableExchangeContracts}
        />
      </WizardPage>
      <WizardPage
        onClickNext={props.onClickNext}
        onClickPrev={props.onClickPrev}
      >
        <StepPolicies
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
  <Composer components={[<AccountConsumer />, <BalanceConsumer />]}>
    {([account, balances]) => {
      if (!balances.eth || isZero(balances.eth)) {
        return (
          <InsufficientEth
            eth={balances.eth}
            weth={balances.weth}
            address={account}
          />
        );
      }

      return <SetupFormContainer {...props} account={account} />;
    }}
  </Composer>
);
