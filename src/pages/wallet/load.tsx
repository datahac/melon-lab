import React from 'react';
import LoadWallet from '+/components/LoadWallet';
import DefaultTemplate from '+/components/DefaultTemplate';
import checkHasWallet from '~/shared/utils/checkHasWallet';
import isError from '~/shared/utils/isError';
import Error from '~/error';

export default class WalletLoadPage extends React.Component {
  static async getInitialProps(context) {
    const hasWallet = await checkHasWallet(context.apolloClient);
    if (!hasWallet) {
      return { statusCode: 403 };
    }

    return {};
  }

  render() {
    const { statusCode, ...props } = this.props;
    if (statusCode && isError(statusCode)) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <DefaultTemplate title="Load Wallet">
        <LoadWallet />
      </DefaultTemplate>
    );
  }
}
