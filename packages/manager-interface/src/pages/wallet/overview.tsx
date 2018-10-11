import React from 'react';
import WalletOverview from '+/components/WalletOverview';
import WalletTemplate from '+/components/WalletTemplate';
import Link from '~/blocks/Link';
import redirect from '~/utils/redirect';
import checkHasWallet from '~/utils/checkHasWallet';

export default class Index extends React.Component {
  static async getInitialProps(context) {
    const { hasWallet } = await checkHasWallet(context.apolloClient);

    if (!hasWallet.wallet) {
      redirect(context, '/wallet');
    }

    return { hasWallet };
  }

  render() {
    return (
      <WalletTemplate
        {...this.props}
        title={!this.props.account ? 'Setup your Wallet' : 'Your Wallet'}
        text={
          !this.props.account ? (
            'Before you can setup your fund, you need to import, restore or create a wallet'
          ) : (
            <Link
              title="Your ethereum address. Use this for white listing on ico.bitcoinsuisse.ch"
              target="_blank"
              href={{
                pathname: `https://${
                  this.props.network === 'KOVAN' ? 'kovan.' : ''
                }etherscan.io/address/${this.props.account}`,
              }}
            >
              {this.props.account}
            </Link>
          )
        }
        icon="icons_wallet"
      >
        <WalletOverview {...this.props} />
      </WalletTemplate>
    );
  }
}
