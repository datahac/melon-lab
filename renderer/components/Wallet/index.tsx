import React from 'react';
import Composer from 'react-composer';
import Wallet from '~/components/Wallet';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { WalletQuery, WalletMutation } from './data/wallet';
import { withRouter } from 'next/router';

class WalletContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <FundManagerConsumer />,
          <BalanceConsumer />,
          <NetworkConsumer />,
          <WalletQuery />,
          <WalletMutation
            onCompleted={() => {
              this.props.router.push({
                pathname: '/wallet',
              });
            }}
          />,
        ]}
      >
        {([
          account,
          managerProps,
          balances,
          network,
          walletProps,
          deleteWallet,
        ]) => {
          const hasWallet =
            walletProps.data && walletProps.data.hasStoredWallet;

          return (
            <Wallet
              associatedFund={managerProps.fund}
              balances={balances}
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

export default withRouter(WalletContainer);
