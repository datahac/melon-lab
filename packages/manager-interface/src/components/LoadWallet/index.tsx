import LoadWallet from '~/components/LoadWallet/container';
import { compose, withState } from 'recompose';
import Router from 'next/router';
import { WalletQuery, WalletMutation } from './data/wallet';

const withLoadWalletErrorState = withState('error', 'setError', null);

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
            hasStoredWallet={props.data && props.data.hasStoredWallet}
            serverError={baseProps.error}
            onSubmit={values =>
              loadWallet({
                variables: {
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
  withLoadWalletErrorState,
  withLoadWallet,
)(LoadWallet);
