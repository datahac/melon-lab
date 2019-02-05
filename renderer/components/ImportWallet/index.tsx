import React, { useState } from 'react';
import ImportWallet from '~/components/ImportWallet';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import withForm from './withForm';

const ImportWalletForm = withForm(ImportWallet);

const ImportWalletContainer = ({ router }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const onImportFile = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result !== 'null') {
        setFile(reader.result);
      }
    };

    reader.readAsBinaryString(file[0]);
  };

  return (
    <Composer
      components={[
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
      {([[importWallet, walletProps]]) => (
        <ImportWalletForm
          onImportFile={onImportFile}
          file={file}
          serverError={error}
          onSubmit={values =>
            importWallet({
              variables: {
                file,
                password: values.password,
              },
            }).catch(setError)
          }
          loading={walletProps.loading}
        />
      )}
    </Composer>
  );
};

export default withRouter(ImportWalletContainer);
