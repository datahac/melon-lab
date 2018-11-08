import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import DownloadWallet from '+/components/DownloadWallet';
import checkIsLoggedIn from '~/utils/checkIsLoggedIn';
import isError from '~/utils/isError';
import Error from '~/error';

export default class WalletDownloadPage extends React.Component {
  static async getInitialProps(context) {
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    if (!isLoggedIn) {
      return { statusCode: 403 };
    }

    return {};
  }

  render() {
    const { statusCode, ...props } = this.props;
    if (statusCode && isError(statusCode)) {
      return (<Error statusCode={statusCode} />);
    }

    return (
      <DefaultTemplate title="Download Wallet">
        <DownloadWallet />
      </DefaultTemplate>
    );
  }
}
