import React from 'react';
import * as R from 'ramda';
import Wallet from '~/components/Wallet';
import { WalletQuery, WalletMutation } from './data/wallet';

const hasWallet = R.pathSatisfies(value => !!value, [
  'data',
  'wallet',
  'encryptedWallet',
]);

const withSetup = BaseComponent => baseProps => (
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
            hasWallet={hasWallet(walletProps)}
            currentAddress={baseProps.account}
            networkId={baseProps.network}
          />
        )}
      </WalletMutation>
    )}
  </WalletQuery>
);
export default withSetup(Wallet);
