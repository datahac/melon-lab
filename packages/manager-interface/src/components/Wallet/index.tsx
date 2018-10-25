import React from 'react';
import Composer from 'react-composer';
import Wallet from '~/components/Wallet';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { WalletQuery, WalletMutation } from './data/wallet';

export default class WalletContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <FundManagerConsumer />,
          <BalanceConsumer />,
          <NetworkConsumer />,
          <WalletQuery />,
          <WalletMutation />,
        ]}>
        {([account, associatedFund, balances, network, walletProps, deleteWallet]) => {
          const hasWallet = walletProps.data && walletProps.data.hasStoredWallet;

          return (
            <Wallet
              associatedFund={associatedFund}
              balances={{
                eth: balances.eth,
                mln: balances.mln,
                weth: balances.weth,
              }}
              deleteWallet={deleteWallet}
              loading={walletProps.loading}
              hasAccount={!!account}
              hasWallet={hasWallet}
              currentAddress={account}
              networkId={network && network.network}
            />
          );
        }}
      </Composer>
    );
  }
}
