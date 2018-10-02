import React from 'react';
import Account from '@melonproject/manager-components/components/Account';
import { WalletQuery, WalletMutation } from './data/wallet';

const withSetup = BaseComponent => baseProps => (
  <WalletQuery>
    {walletProps => (
      <WalletMutation>
        {deleteWallet => (
          <BaseComponent
            deleteWallet={deleteWallet}
            loading={walletProps.loading}
            hasAccount={baseProps.authenticated}
            hasWallet={!!walletProps.data.storedWallet}
            currentAddress={baseProps.account}
            networkId={baseProps.network}
          />
        )}
      </WalletMutation>
    )}
  </WalletQuery>
);
export default withSetup(Account);
