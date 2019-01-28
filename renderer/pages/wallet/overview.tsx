import React from 'react';
import Composer from 'react-composer';
import WalletOverview from '+/components/WalletOverview';
import WalletTemplate from '+/components/WalletTemplate';
import Link from '~/blocks/Link';
import redirect from '~/shared/utils/redirect';
import checkIsLoggedIn from '~/shared/utils/checkIsLoggedIn';
import { NetworkConsumer } from '+/components/NetworkContext';
import { AccountConsumer } from '+/components/AccountContext';

export default class WalletOverviewPage extends React.Component {
  static async getInitialProps(context) {
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    if (!isLoggedIn) {
      redirect(context, '/wallet');
    }

    return {};
  }

  render() {
    return (
      <Composer components={[<NetworkConsumer />, <AccountConsumer />]}>
        {([network, account]) => {
          const prefix = network.network === 'KOVAN' ? 'kovan.' : '';
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
            <WalletTemplate title="Your Wallet" icon="wallet" text={text}>
              <WalletOverview />
            </WalletTemplate>
          );
        }}
      </Composer>
    );
  }
}
