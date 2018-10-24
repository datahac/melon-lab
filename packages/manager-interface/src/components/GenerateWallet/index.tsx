import React from 'react';
import GenerateWallet from '~/components/GenerateWallet';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import { withFormik } from 'formik';
import WalletMutation from './data/wallet';
import MnemonicMutation from './data/mnemonic';
import bip39 from 'bip39';
import * as Yup from 'yup';

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

const GenerateWalletForm = withFormValidation(GenerateWallet);

class MnemonicHandler extends React.Component {
  componentDidMount() {
    this.props.generateMnemonic();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

class GenerateWalletContainer extends React.Component {
  state = {
    showForm: false,
  };

  setShowForm = (showForm) => {
    this.setState({
      showForm,
    });
  }

  render() {
    return (
      <Composer components={[
        ({ render }) => <MnemonicMutation>{(a, b) => render([a, b])}</MnemonicMutation>,
        ({ render }) => <WalletMutation onCompleted={() => {
          this.props.router.replace({
            pathname: '/wallet/overview',
          });
        }}>{(a, b) => render([a, b])}</WalletMutation>,
      ]}>
        {([[generateMnemonic, mnemonicProps], [restoreWallet, restoreWalletProps]]) => {
          return (
            <MnemonicHandler generateMnemonic={generateMnemonic}>
              <GenerateWalletForm
                showForm={this.state.showForm}
                setShowForm={this.setShowForm}
                mnemonic={mnemonicProps.data && mnemonicProps.data.generateMnemonic}
                loading={restoreWalletProps.loading || mnemonicProps.loading}
                onSubmit={values => {
                  restoreWallet({
                    variables: { ...values },
                  });
                }}
              />
            </MnemonicHandler>
          );
        }}
      </Composer>
    )
  }
}

export default withRouter(GenerateWalletContainer);
