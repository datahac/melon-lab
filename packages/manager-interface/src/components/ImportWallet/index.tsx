import React from 'react';
import ImportWallet from '~/components/ImportWallet';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  password: '',
};

const withForm = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: Yup.object().shape({
    password: Yup.string().required('Password is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const ImportWalletForm = withForm(ImportWallet);

class ImportWalletContainer extends React.Component {
  state = {
    file: null,
    error: null,
  };

  setFile = (file) => {
    this.setState({ file });
  }

  setError = (error) => {
    this.setError({ error });
  }

  onImportFile = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setFile(reader.result);
    };

    reader.readAsBinaryString(file[0]);
  }

  render() {
    return (
      <Composer components={[
        ({ render }) => (
          <WalletMutation onCompleted={() => {
            this.props.router.replace({
              pathname: '/wallet',
            });
          }}>
            {(a, b) => render([a, b])}
          </WalletMutation>
        ),
      ]}>
        {([[importWallet, walletProps]]) => (
          <ImportWalletForm
            onImportFile={this.onImportFile}
            file={this.state.file}
            serverError={this.state.error}
            onSubmit={values =>
              importWallet({
                variables: {
                  file: this.state.file,
                  password: values.password,
                },
              }).catch(this.setError)
            }
            loading={walletProps.loading}
          />
        )}
      </Composer>
    );
  }
}

export default withRouter(ImportWalletContainer);
