import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import RestoreWallet from '+/components/RestoreWallet';

export default class WalletRestorePage extends React.Component {
  render() {
    return (
      <DefaultTemplate title="Restore Wallet">
        <RestoreWallet />
      </DefaultTemplate>
    );
  }
}