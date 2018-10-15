import React from 'react';
import Setup from '@melonproject/manager-components/components/Setup';
import FeeFormModal from '+/components/FeeFormModal';
import FundMutation from './data/fund';
import { compose, withHandlers, withState } from 'recompose';
import Router from 'next/router';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  name: '',
};

const withFormValidation = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: Yup.object().shape({
    name: Yup.string().required('name is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withSignedState = withState('signed', 'setSigned', false);

const withSetupHandlers = withHandlers({
  onClickDecline: props => e => {
    Router.replace({
      pathname: '/wallet',
    });
  },

  onClickAccept: props => e => {
    props.setSigned(true);
  },
});

// Redirect to created fund
const redirect = address =>
  Router.replace({
    pathname: '/manage',
    query: { address: address },
  });

const withSetup = BaseComponent => baseProps => (
  <FundMutation onCompleted={redirect} account={baseProps.account}>
    {(createFund, createFundProps) => (
      <BaseComponent
        address={baseProps.account}
        balances={{
          eth: baseProps.eth,
          mln: baseProps.mln,
        }}
        FeeFormModal={FeeFormModal}
        FeeFormModalProps={{}}
        onClickDecline={baseProps.onClickDecline}
        signed={baseProps.signed}
        onClickAccept={baseProps.onClickAccept}
        canonicalPriceFeedAddress={baseProps.canonicalPriceFeedAddress}
        competitionComplianceAddress={baseProps.competitionComplianceAddress}
        noComplianceAddress={baseProps.noComplianceAddress}
        onSubmit={values =>
          createFund({
            variables: {
              name: values.name,
              account: baseProps.account,
            },
          })
        }
        loading={createFundProps.loading}
      />
    )}
  </FundMutation>
);

export default compose(
  withSignedState,
  withSetupHandlers,
  withSetup,
  withFormValidation,
)(Setup);
