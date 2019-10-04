import React from 'react';
import Withdraw from '+/components/Withdraw';
import checkIsLoggedIn from '~/utils/checkIsLoggedIn';
import Error from '~/error';
import isError from '~/utils/isError';
import WalletTemplate from '+/components/WalletTemplate';
import Composer from 'react-composer';
import { NetworkConsumer } from '+/components/NetworkContext';
import { AccountConsumer } from '+/components/AccountContext';
import Link from '~/blocks/Link';

export default class WithdrawPage extends React.Component {
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
      return <Error statusCode={statusCode} />;
    }

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
              <Withdraw />
            </WalletTemplate>
          );
        }}
      </Composer>
    );
  }
}
