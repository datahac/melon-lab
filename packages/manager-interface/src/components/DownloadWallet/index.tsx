import DownloadWallet from '~/components/DownloadWallet';
import { compose, withState } from 'recompose';
import { downloadWallet } from '~/utils/createDownload';
import Router from 'next/router';
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
  handleSubmit: (values, form) => {
    form.props.onSubmit && form.props.onSubmit(values);
    form.resetForm();
  },
});

const withLoadingState = withState('loading', 'setLoading', false);

const withDownloadWallet = BaseComponent => baseProps => (
  <BaseComponent
    loading={baseProps.loading}
    onSubmit={values => {
      baseProps.setLoading(true);
      downloadWallet(
        values.password,
        baseProps.privateKey,
        baseProps.account,
      ).then(() => {
        Router.replace({
          pathname: '/wallet',
        });
        baseProps.setLoading(false);
      });
    }}
  />
);

export default compose(
  withLoadingState,
  withDownloadWallet,
  withFormValidation,
)(DownloadWallet);
