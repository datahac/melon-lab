import React from 'react';
import RestoreWallet from '~/components/RestoreWallet';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import withForm from './withForm';

const RestoreWalletForm = withForm(RestoreWallet);

const RestoreWalletContainer = ({ router }) => (
  <WalletMutation
    onCompleted={() => {
      router.push({
        pathname: '/wallet/overview',
      });
    }}
  >
    {(restoreWallet, restoreWalletProps) => {
      return (
        <RestoreWalletForm
          onSubmit={values => {
            restoreWallet({
              variables: {
                mnemonic: values.mnemonic,
                password: values.password,
              },
            });
          }}
          loading={restoreWalletProps.loading}
        />
      );
    }}
  </WalletMutation>
);

export default withRouter(RestoreWalletContainer);
