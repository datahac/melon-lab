import GenerateWallet from '~/components/GenerateWallet/container';
import { compose, defaultProps } from 'recompose';
import Router from 'next/router';
import generateMnemonic from '~/utils/generateMnemonic';
import WalletMutation from './data/wallet';

const withGenerateWalletProps = defaultProps({
  mnenomic: generateMnemonic(),
});

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withGenerateWallet = BaseComponent => baseProps => (
  <WalletMutation onCompleted={redirect}>
    {(restoreWallet, walletProps) => (
      <BaseComponent
        mnemonic={baseProps.mnenomic}
        onSubmit={values =>
          restoreWallet({
            variables: { ...values },
          })
        }
        loading={walletProps.loading}
      />
    )}
  </WalletMutation>
);

export default compose(
  withGenerateWalletProps,
  withGenerateWallet,
)(GenerateWallet);
