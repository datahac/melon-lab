import React from 'react';
import GenerateWallet from '+/components/GenerateWallet';
import DefaultTemplate from '+/components/DefaultTemplate';

export default class WalletGeneratePage extends React.Component {
  render() {
    return (
      <DefaultTemplate title="Generate Wallet">
        <GenerateWallet />
      </DefaultTemplate>
    );
  }
}
