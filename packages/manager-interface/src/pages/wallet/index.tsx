import React from 'react';
import Wallet from '+/components/Wallet';
import WalletTemplate from '+/components/WalletTemplate';
import redirect from '~/utils/redirect';
import checkIsLoggedIn from '~/utils/checkIsLoggedIn';

export default class WalletIndexPage extends React.Component {
  static async getInitialProps(context) {
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    if (isLoggedIn) {
      redirect(context, '/wallet/overview');
    }

    return {};
  }

  render() {
    return (
      <WalletTemplate
        {...this.props}
        title="Setup your Wallet"
        icon="icons_wallet"
        text="Before you can setup your fund, you need to import, restore or create a wallet."
      >
        <Wallet {...this.props} />
      </WalletTemplate>
    );
  }
}
