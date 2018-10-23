import RestoreWallet from '~/components/RestoreWallet';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import bip39 from 'bip39';
import { withFormik } from 'formik';
import { compose } from 'recompose';
import * as Yup from 'yup';

const initialValues = {
  mnemonic: '',
  password: '',
};

const withFormValidation = withFormik({
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

const withRestoreWallet = BaseComponent => baseProps => (
  <WalletMutation onCompleted={() => {
    baseProps.router.replace({
      pathname: '/wallet',
    });
  }}>
    {(storeWallet, mutationProps) => (
      <BaseComponent
        onSubmit={values =>
          storeWallet({
            variables: { ...values },
          })
        }
        loading={mutationProps.loading}
      />
    )}
  </WalletMutation>
);

export default compose(
  withRouter,
  withRestoreWallet,
  withFormValidation,
)(RestoreWallet);
