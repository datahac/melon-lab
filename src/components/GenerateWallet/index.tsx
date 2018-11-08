import React from 'react';
import GenerateWallet from '~/components/GenerateWallet';
import Composer from 'react-composer';
import { withRouter } from 'next/router';
import WalletMutation from './data/wallet';
import MnemonicMutation from './data/mnemonic';
import withForm from './withForm';

const GenerateWalletForm = withForm(GenerateWallet);

class MnemonicHandler extends React.Component {
  componentDidMount() {
    this.props.generateMnemonic();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

class GenerateWalletContainer extends React.Component {
  state = {
    showForm: false,
  };

  setShowForm = showForm => {
    this.setState({
      showForm,
    });
  };

  render() {
    return (
      <Composer
        components={[
          ({ render }) => (
            <MnemonicMutation>{(a, b) => render([a, b])}</MnemonicMutation>
          ),
          ({ render }) => (
            <WalletMutation
              onCompleted={() => {
                this.props.router.replace({
                  pathname: '/wallet/overview',
                });
              }}
            >
              {(a, b) => render([a, b])}
            </WalletMutation>
          ),
        ]}
      >
        {([
          [generateMnemonic, mnemonicProps],
          [restoreWallet, restoreWalletProps],
        ]) => {
          return (
            <MnemonicHandler generateMnemonic={generateMnemonic}>
              <GenerateWalletForm
                showForm={this.state.showForm}
                setShowForm={this.setShowForm}
                mnemonic={
                  mnemonicProps.data && mnemonicProps.data.generateMnemonic
                }
                loading={restoreWalletProps.loading || mnemonicProps.loading}
                onSubmit={values => {
                  restoreWallet({
                    variables: { ...values },
                  });
                }}
              />
            </MnemonicHandler>
          );
        }}
      </Composer>
    );
  }
}

export default withRouter(GenerateWalletContainer);
