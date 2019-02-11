import React from 'react';
import Composer from 'react-composer';
import Wallet from '~/components/Wallet';
import { AccountConsumer } from '+/components/AccountContext';
import { BalanceConsumer } from '+/components/BalanceContext';
import { NetworkConsumer } from '+/components/NetworkContext';
import { FundManagerConsumer } from '+/components/FundManagerContext';
import {
  WalletQuery,
  DeleteWalletMutation,
  UseFrameMutation,
} from './data/wallet';
import { withRouter } from 'next/router';
import { Router } from 'express';

const WalletContainer = ({ router }) => (
  <Composer
    components={[
      <AccountConsumer />,
      <FundManagerConsumer />,
      <BalanceConsumer />,
      <NetworkConsumer />,
      <WalletQuery />,
      <DeleteWalletMutation
        onCompleted={() => {
          router.push({
            pathname: '/wallet',
          });
        }}
      />,
      <UseFrameMutation
        onCompleted={() => {
          router.push({ pathname: '/' });
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
      useFrameAccount,
    ]) => {
      const hasWallet = walletProps.data && walletProps.data.hasStoredWallet;
      const ethAccounts = walletProps.data && walletProps.data.ethAccounts;

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
          ethAccounts={ethAccounts}
          useFrameAccount={useFrameAccount}
        />
      );
    }}
  </Composer>
);

export default withRouter(WalletContainer);
