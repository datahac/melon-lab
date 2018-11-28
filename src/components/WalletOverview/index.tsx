import React from 'react';
import Composer from 'react-composer';
import WalletOverview from '~/components/WalletOverview';
import { WalletQuery } from './data/wallet';
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
        ]}
      >
        {([network, account, balances, associatedFund, walletProps]) => {
          return (
            <WalletOverview
              associatedFund={associatedFund}
              balances={balances}
              loading={walletProps.loading}
              currentAddress={account}
              networkId={network.network}
            />
          );
        }}
      </Composer>
    );
  }
}
