import LoadWallet from '~/components/LoadWallet/container';
import { compose, withState } from 'recompose';
import Router from 'next/router';
import { WalletQuery, WalletMutation } from './data/wallet';

const withLoadWalleteErrorState = withState('error', 'setError', null);

const redirect = () =>
  Router.replace({
    pathname: '/wallet',
  });

const withLoadWallet = BaseComponent => baseProps => (
  <WalletQuery>
    {props => (
      <WalletMutation onCompleted={redirect}>
        {(loadWallet, mutationProps) => (
          <BaseComponent
            serverError={baseProps.error}
            onSubmit={values =>
              loadWallet({
                variables: {
                  file: props.data && props.data.wallet && props.data.wallet.encryptedWallet,
                  password: values.password,
                },
              }).catch(error => baseProps.setError(error.message))
            }
            loading={mutationProps.loading || props.loading}
          />
        )}
      </WalletMutation>
    )}
  </WalletQuery>
);

export default compose(
  withLoadWalleteErrorState,
  withLoadWallet,
)(LoadWallet);
