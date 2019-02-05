import React, { useState } from 'react';
import Composer from 'react-composer';
import LoadWallet from '~/components/LoadWallet';
import { withRouter } from 'next/router';
import { WalletQuery, WalletMutation } from './data/wallet';
import withForm from './withForm';

const LoadWalletForm = withForm(LoadWallet);

const LoadWalletContainer = ({ router }) => {
  const [error, setError] = useState(null);

  return (
    <Composer
      components={[
        <WalletQuery />,
        ({ render }) => (
          <WalletMutation
            onCompleted={() => {
              router.push({
                pathname: '/wallet',
              });
            }}
          >
            {(a, b) => render([a, b])}
          </WalletMutation>
        ),
      ]}
    >
      {([walletProps, [loadWallet, mutationProps]]) => {
        const hasStoredWallet =
          walletProps.data && walletProps.data.hasStoredWallet;
        const isLoading = mutationProps.loading || walletProps.loading;

        return (
          <LoadWalletForm
            hasStoredWallet={hasStoredWallet}
            serverError={error}
            onSubmit={values => {
              loadWallet({
                variables: {
                  password: values.password,
                },
              }).catch(error => {
                setError(error.message);
              });
            }}
            loading={isLoading}
          />
        );
      }}
    </Composer>
  );
};

export default withRouter(LoadWalletContainer);
