import React from 'react';
import RestoreWallet from '~/components/RestoreWallet';
import { withRouter } from 'next/router';
import { withFormik } from 'formik';
import WalletMutation from './data/wallet';
import bip39 from 'bip39';
import * as Yup from 'yup';

const initialValues = {
  mnemonic: '',
  password: '',
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: Yup.object().shape({
    mnemonic: Yup.string()
      .required('mnemonic is required.')
      .test('is-valid', 'Mnemonic is not valid', value =>
        bip39.validateMnemonic(value),
      ),
    password: Yup.string()
      .required('Password is required.')
      .min(8, 'Password needs to be at least 8 chars long. For your security!')
      .max(
        64,
        'Password is too long. Please reduce your password to max 64 chars!',
      ),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const RestoreWalletForm = withForm(RestoreWallet);

class RestoreWalletContainer extends React.Component {
  render() {
    return (
      <WalletMutation onCompleted={() => {
        this.props.router.replace({
          pathname: '/wallet/overview',
        });
      }}>
        {(restoreWallet, restoreWalletProps) => {
          return (
            <RestoreWalletForm
              onSubmit={values => {
                restoreWallet({
                  variables: {
                    mnemonic: values.mnemonic,
                    password: values.password,
                  },
                });
              }}
              loading={restoreWalletProps.loading}
            />
          );
        }}
      </WalletMutation>
    )
  }
}

export default withRouter(RestoreWalletContainer);
