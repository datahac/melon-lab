import DownloadWallet from '~/components/DownloadWallet';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import ExportWalletMutation from './data/export';
import { AccountConsumer } from '+/components/AccountContext';
import { downloadWallet } from '~/utils/createDownload';
import withForm from './withForm';

const DownloadWalletForm = withForm(DownloadWallet);

class DownloadWalletContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          ({ results: [account], render }) => (
            <ExportWalletMutation
              onCompleted={data => {
                const wallet = data && data.exportWallet;

                downloadWallet(wallet, account).then(() => {
                  this.props.router.push({
                    pathname: '/wallet',
                  });
                });
              }}
            >
              {(a, b) => render([a, b])}
            </ExportWalletMutation>
          ),
        ]}
      >
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
