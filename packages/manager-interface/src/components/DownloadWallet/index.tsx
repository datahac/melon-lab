import DownloadWallet from '~/components/DownloadWallet/container';
import { compose, withState } from 'recompose';
import { downloadWallet } from '~/utils/createDownload';
import Router from 'next/router';

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
)(DownloadWallet);
