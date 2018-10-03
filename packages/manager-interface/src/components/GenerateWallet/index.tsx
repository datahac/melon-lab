import GenerateWallet from '~/components/GenerateWallet/container';
import Router from 'next/router';
import WalletMutation from './data/wallet';
import MnemonicQuery from './data/mnemonic';

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withGenerateWallet = BaseComponent => baseProps => (
  <MnemonicQuery>
    {mnemonicProps => (
      <WalletMutation onCompleted={redirect}>
        {(restoreWallet, restoreWalletProps) => (
          <BaseComponent
            mnemonic={mnemonicProps.data && mnemonicProps.data.mnemonic}
            onSubmit={values =>
              restoreWallet({
                variables: { ...values },
              })
            }
            loading={restoreWalletProps.loading || mnemonicProps.loading}
          />
        )}
      </WalletMutation>
    )}
  </MnemonicQuery>
);

export default withGenerateWallet(GenerateWallet);
