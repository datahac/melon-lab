import ImportWallet from '~/components/ImportWallet/container';
import { compose, withState, withHandlers } from 'recompose';
import Router from 'next/router';
import WalletMutation from './data/wallet';

const withImportWalletHandlers = withHandlers({
  onImportFile: props => file => {
    const reader = new FileReader();

    reader.onloadend = () => {
      props.setFile(reader.result);
    };

    reader.readAsBinaryString(file[0]);
  },
});

const withImportWalletFileState = withState('file', 'setFile', null);
const withImportWalleteErrorState = withState('error', 'setError', null);

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withImportWallet = BaseComponent => baseProps => (
  <WalletMutation onCompleted={redirect}>
    {(importWallet, walletProps) => (
      <BaseComponent
        onImportFile={baseProps.onImportFile}
        file={baseProps.file}
        serverError={baseProps.error}
        onSubmit={values =>
          importWallet({
            variables: {
              file: baseProps.file,
              password: values.password,
            },
          }).catch(error => baseProps.setError(error.message))
        }
        loading={walletProps.loading}
      />
    )}
  </WalletMutation>
);

export default compose(
  withImportWalletFileState,
  withImportWalleteErrorState,
  withImportWalletHandlers,
  withImportWallet,
)(ImportWallet);
