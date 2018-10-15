import ImportWallet from '~/components/ImportWallet';
import { compose, withState, withHandlers } from 'recompose';
import Router from 'next/router';
import WalletMutation from './data/wallet';
import { withFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  password: '',
};

const withFormValidation = withFormik({
  mapPropsToValues: props =>
    props.formValues ? { ...props.formValues } : initialValues,
  validationSchema: Yup.object().shape({
    password: Yup.string().required('Password is required.'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, form) =>
    form.props.onSubmit && form.props.onSubmit(values),
});

const withImportWalletHandlers = withHandlers({
  onImportFile: props => file => {
    const reader = new FileReader();

    reader.onloadend = () => {
      props.setFile(reader.result);
    };

    reader.readAsBinaryString(file[0]);
  },
});

const withImportWalletFileState = withState('file', 'setFile', null);
const withImportWalletErrorState = withState('error', 'setError', null);

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withImportWallet = BaseComponent => baseProps => (
  <WalletMutation onCompleted={redirect}>
    {(importWallet, walletProps) => (
      <BaseComponent
        onImportFile={baseProps.onImportFile}
        file={baseProps.file}
        serverError={baseProps.error}
        onSubmit={values =>
          importWallet({
            variables: {
              file: baseProps.file,
              password: values.password,
            },
          }).catch(error => baseProps.setError(error.message))
        }
        loading={walletProps.loading}
      />
    )}
  </WalletMutation>
);

export default compose(
  withImportWalletFileState,
  withImportWalletErrorState,
  withImportWalletHandlers,
  withImportWallet,
  withFormValidation,
)(ImportWallet);
