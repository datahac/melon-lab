import React from 'react';
import Composer from 'react-composer';
import LoadWallet from '~/components/LoadWallet';
import { withRouter } from 'next/router';
import { WalletQuery, WalletMutation } from './data/wallet';
import withForm from './withForm';

const LoadWalletForm = withForm(LoadWallet);
class LoadWalletContainer extends React.Component {
  state = {
    error: null,
  };

  setError = error => {
    this.setState({ error });
  };

  render() {
    return (
      <Composer
        components={[
          <WalletQuery />,
          ({ render }) => (
            <WalletMutation
              onCompleted={() => {
                this.props.router.replace({
                  pathname: '/wallet',
                });
              }}
            >
              {(a, b) => render([a, b])}
            </WalletMutation>
          ),
        ]}
      >
        {([walletProps, [loadWallet, mutationProps]]) => {
          const hasStoredWallet =
            walletProps.data && walletProps.data.hasStoredWallet;
          const isLoading = mutationProps.loading || walletProps.loading;

          return (
            <LoadWalletForm
              hasStoredWallet={hasStoredWallet}
              serverError={this.state.error}
              onSubmit={values => {
                loadWallet({
                  variables: {
                    password: values.password,
                  },
                }).catch(error => {
                  this.setError(error.message);
                });
              }}
              loading={isLoading}
            />
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(LoadWalletContainer);
