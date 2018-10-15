import DownloadWallet from '~/components/DownloadWallet';
import { compose } from 'recompose';
import { withFormik } from 'formik';
import { withRouter } from 'next/router';
import * as Yup from 'yup';
import ExportWalletMutation from './data/export';

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
  handleSubmit: (values, form) => {
    form.props.onSubmit && form.props.onSubmit(values);
    form.resetForm();
  },
});

const withDownloadWallet = BaseComponent => baseProps => (
  <ExportWalletMutation account={baseProps.account} router={baseProps.router}>
    {(exportWallet, exportProps) => (
      <BaseComponent
        loading={exportProps.loading}
        onSubmit={values => {
          exportWallet({
            variables: {
              password: values.password,
            },
          });
        }}
      />
    )}
  </ExportWalletMutation>
);

export default compose(
  withRouter,
  withDownloadWallet,
  withFormValidation,
)(DownloadWallet);
