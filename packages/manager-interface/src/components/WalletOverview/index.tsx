import React from 'react';
import WalletOverview from '~/components/WalletOverview';
import { WalletQuery, WalletMutation } from './data/wallet';

const withSetup = BaseComponent => baseProps => console.log(baseProps) || (
  <WalletQuery>
    {walletProps => (
      <WalletMutation>
        {deleteWallet => (
          <BaseComponent
            associatedFund={baseProps.associatedFund}
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
export default withSetup(WalletOverview);
