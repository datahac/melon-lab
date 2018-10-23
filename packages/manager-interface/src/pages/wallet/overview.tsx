import React from 'react';
import WalletOverview from '+/components/WalletOverview';
import WalletTemplate from '+/components/WalletTemplate';
import Link from '~/blocks/Link';
import redirect from '~/utils/redirect';
import checkIsLoggedIn from '~/utils/checkIsLoggedIn';

export default class WalletOverviewPage extends React.Component {
  static async getInitialProps(context) {
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    if (!isLoggedIn) {
      redirect(context, '/wallet');
    }

    return {};
  }

  render() {
    const { network, account } = this.props;
    const prefix = network === 'KOVAN' ? 'kovan.' : '';
    const pathname = `https://${prefix}etherscan.io/address/${account}`;
    const text = (
      <Link
        title="Your ethereum address. Use this for white listing on ico.bitcoinsuisse.ch"
        target="_blank"
        href={{ pathname }}
      >
        {account}
      </Link>
    );

    return (
      <WalletTemplate
        {...this.props}
        title="Your Wallet"
        icon="icons_wallet"
        text={text}
      >
        <WalletOverview {...this.props} />
      </WalletTemplate>
    );
  }
}
