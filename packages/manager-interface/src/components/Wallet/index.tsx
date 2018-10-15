import React from 'react';
import Wallet from '~/components/Wallet';
import { WalletQuery, WalletMutation } from './data/wallet';

const withSetup = BaseComponent => baseProps => (
  <WalletQuery>
    {walletProps => (
      <WalletMutation>
        {deleteWallet => (
          <BaseComponent
            associatedFund={
              baseProps.associatedFund && baseProps.associatedFund
            }
            balances={{
              eth: baseProps.eth,
              mln: baseProps.mln,
              weth: baseProps.weth,
            }}
            deleteWallet={deleteWallet}
            loading={walletProps.loading}
            hasAccount={!!baseProps.account}
            hasWallet={walletProps.data && walletProps.data.hasStoredWallet}
            currentAddress={baseProps.account}
            networkId={baseProps.network}
          />
        )}
      </WalletMutation>
    )}
  </WalletQuery>
);
export default withSetup(Wallet);
