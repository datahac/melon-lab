import React, { useState, useEffect } from 'react';
import GenerateWallet from '~/components/GenerateWallet';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import MnemonicMutation from './data/mnemonic';
import withForm from './withForm';

const GenerateWalletForm = withForm(GenerateWallet);

const MnemonicHandler = ({ generateMnemonic, children }) => {
  useEffect(() => {
    generateMnemonic();
  }, [generateMnemonic]);

  return React.Children.only(children);
};

const GenerateWalletContainer = ({ router }) => {
  const [showForm, setShowForm] = useState(null);

  return (
    <Composer
      components={[
        ({ render }) => <MnemonicMutation>{(a, b) => render([a, b])}</MnemonicMutation>,
        ({ render }) => (
          <WalletMutation
            onCompleted={() => {
              router.push({
                pathname: '/wallet/overview',
              });
            }}
          >
            {(a, b) => render([a, b])}
          </WalletMutation>
        ),
      ]}
    >
      {([[generateMnemonic, mnemonicProps], [restoreWallet, restoreWalletProps]]) => {
        return (
          <MnemonicHandler generateMnemonic={generateMnemonic}>
            <GenerateWalletForm
              showForm={showForm}
              setShowForm={setShowForm}
              mnemonic={mnemonicProps.data && mnemonicProps.data.generateMnemonic}
              loading={restoreWalletProps.loading || mnemonicProps.loading}
              onSubmit={values => {
                restoreWallet({
                  variables: { ...values },
                });
              }}
            />
          </MnemonicHandler>
        );
      }}
    </Composer>
  );
};

export default withRouter(GenerateWalletContainer);
