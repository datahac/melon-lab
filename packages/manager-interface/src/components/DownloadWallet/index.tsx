import DownloadWallet from '~/components/DownloadWallet';
import Composer from 'react-composer';
import { withFormik } from 'formik';
import { withRouter } from 'next/router';
import * as Yup from 'yup';
import ExportWalletMutation from './data/export';
import { AccountConsumer } from '+/components/AccountContext';
import { downloadWallet } from '~/utils/createDownload';

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
  handleSubmit: (values, form) => {
    form.props.onSubmit && form.props.onSubmit(values);
    form.resetForm();
  },
});

const DownloadWalletForm = withForm(DownloadWallet);

class DownloadWalletContainer extends React.PureComponent {
  render() {
    return (
      <Composer components={[
        <AccountConsumer />,
        ({ results: [account], render }) => (
          <ExportWalletMutation onCompleted={(data) => {
            const wallet = data && data.exportWallet;
        
            downloadWallet(wallet, account).then(() => {
              this.props.router.replace({
                pathname: '/wallet',
              });
            });
          }}>
            {(a, b) => render([a, b])}
          </ExportWalletMutation>
        ),
      ]}>
        {([account, [exportWallet, exportProps]]) => (
          <DownloadWalletForm
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
      </Composer>
    );
  }
}

export default withRouter(DownloadWalletContainer);
