import RestoreWallet from '~/components/RestoreWallet/container';
import Router from 'next/router';
import WalletMutation from './data/wallet';

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withRestoreWallet = BaseComponent => baseProps => (
  <WalletMutation onCompleted={redirect}>
    {(storeWallet, mutationProps) => (
      <BaseComponent
        onSubmit={values =>
          storeWallet({
            variables: { ...values },
          })
        }
        loading={mutationProps.loading}
      />
    )}
  </WalletMutation>
);

export default withRestoreWallet(RestoreWallet);
