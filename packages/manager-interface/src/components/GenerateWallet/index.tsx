import GenerateWallet from '~/components/GenerateWallet/container';
import { compose } from 'recompose';
import Router from 'next/router';
import { WalletQuery, WalletMutation } from './data/wallet';

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withGenerateWallet = BaseComponent => baseProps => (
  <WalletQuery>
    {walletProps => (
      <WalletMutation onCompleted={redirect}>
        {(restoreWallet, restoreWalletProps) => (
          <BaseComponent
            mnemonic={walletProps.data && walletProps.data.mnemonic}
            onSubmit={values =>
              restoreWallet({
                variables: { ...values },
              })
            }
            loading={restoreWalletProps.loading || walletProps.loading}
          />
        )}
      </WalletMutation>
    )}
  </WalletQuery>
);

export default compose(withGenerateWallet)(GenerateWallet);
