import GenerateWallet from '~/components/GenerateWallet';
import { compose, lifecycle, withState } from 'recompose';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import MnemonicMutation from './data/mnemonic';
import bip39 from 'bip39';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const withGenerateWalletState = withState('showForm', 'setShowForm', false);

const initialValues = {
  mnemonic: '',
  password: '',
};

const withFormValidation = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: props =>
    Yup.object().shape({
      mnemonic: Yup.string()
        .required('Mnemonic is required.')
        .test('is-valid', 'Mnemonic is not valid', value =>
          bip39.validateMnemonic(value),
        )
        .test(
          'is-generated-mnemonic',
          'Please type in the genearted mnemonic',
          value => value === props.mnemonic,
        ),
      password: Yup.string()
        .required('Password is required.')
        .min(
          8,
          'Password needs to be at least 8 chars long. For your security!',
        )
        .max(
          64,
          'Password is too long. Please reduce your password to max 64 chars!',
        ),
    }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withGenerateWallet = BaseComponent => baseProps => (
  <MnemonicMutation>
    {(generateMnemonic, mnemonicProps) => (
      <WalletMutation onCompleted={() => {
        baseProps.router.replace({
          pathname: '/wallet/overview',
        })
      }}>
        {(restoreWallet, restoreWalletProps) => (
          <BaseComponent
            generateMnemonic={generateMnemonic}
            mnemonic={mnemonicProps.data && mnemonicProps.data.generateMnemonic}
            onSubmit={values =>
              restoreWallet({
                variables: { ...values },
              })
            }
            loading={restoreWalletProps.loading || mnemonicProps.loading}
          />
        )}
      </WalletMutation>
    )}
  </MnemonicMutation>
);

const withMnemonic = lifecycle({
  componentDidMount() {
    this.props.generateMnemonic();
  },
});

export default compose(
  withRouter,
  withGenerateWallet,
  withMnemonic,
  withGenerateWalletState,
  withFormValidation,
)(GenerateWallet);
