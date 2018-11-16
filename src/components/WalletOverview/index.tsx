import React from 'react';
import Composer from 'react-composer';
import WalletOverview from '~/components/WalletOverview';
import { WalletQuery, WalletMutation } from './data/wallet';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';

export default class WalletOverviewContainer extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <NetworkConsumer />,
          <AccountConsumer />,
          <BalanceConsumer />,
          <FundManagerConsumer />,
          <WalletQuery />,
          <WalletMutation />,
        ]}
      >
        {([
          network,
          account,
          balances,
          associatedFund,
          walletProps,
          deleteWallet,
        ]) => {
          const hasWallet =
            walletProps.data && walletProps.data.hasStoredWallet;

          return (
            <WalletOverview
              associatedFund={associatedFund}
              balances={balances}
              deleteWallet={deleteWallet}
              loading={walletProps.loading}
              hasAccount={!!account}
              hasWallet={hasWallet}
              currentAddress={account}
              networkId={network.network}
            />
          );
        }}
      </Composer>
    );
  }
}
