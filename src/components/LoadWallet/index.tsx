import React from 'react';
import Composer from 'react-composer';
import LoadWallet from '~/components/LoadWallet/container';
import { withRouter } from 'next/router';
import { WalletQuery, WalletMutation } from './data/wallet';

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
          <WalletMutation
            onCompleted={() => {
              this.props.router.replace({
                pathname: '/wallet',
              });
            }}
          />,
        ]}
      >
        {([walletProps, [loadWallet, mutationProps]]) => {
          const hasStoredWallet =
            walletProps.data && walletProps.data.hasStoredWallet;
          const isLoading = mutationProps.loading || walletProps.loading;

          return (
            <LoadWallet
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
