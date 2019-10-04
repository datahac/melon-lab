import React from 'react';
import Composer from 'react-composer';
import WalletOverview from '~/components/WalletOverview';
import { WalletQuery } from './data/wallet';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { SetupConsumer } from '+/components/SetupContext';

const WalletOverviewContainer = ({}) => (
  <Composer
    components={[
      <NetworkConsumer />,
      <AccountConsumer />,
      <BalanceConsumer />,
      <FundManagerConsumer />,
      <SetupConsumer />,
      <WalletQuery />,
    ]}
  >
    {([network, account, balances, manager, setup, walletProps]) => {
      return (
        <WalletOverview
          associatedFund={manager.fund}
          balances={balances}
          loading={walletProps.loading}
          currentAddress={account}
          networkId={network.network}
          isComplete={setup.isComplete}
        />
      );
    }}
  </Composer>
);

export default WalletOverviewContainer;
