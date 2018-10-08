import GenerateWallet from '~/components/GenerateWallet/container';
import { compose, lifecycle } from 'recompose';
import Router from 'next/router';
import WalletMutation from './data/wallet';
import MnemonicMutation from './data/mnemonic';

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withGenerateWallet = BaseComponent => baseProps => (
  <MnemonicMutation>
    {(generateMnemonic, mnemonicProps) => (
      <WalletMutation onCompleted={redirect}>
        {(restoreWallet, restoreWalletProps) => (
          <BaseComponent
            generateMnemonic={generateMnemonic}
            mnemonic={mnemonicProps.data && mnemonicProps.data.generateMnemonic}
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
  </MnemonicMutation>
);

const withMnemonic = lifecycle({
  componentDidMount() {
    this.props.generateMnemonic();
  },
});

export default compose(
  withGenerateWallet,
  withMnemonic,
)(GenerateWallet);
