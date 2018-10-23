import React from 'react';
import ImportWallet from '+/components/ImportWallet';
import DefaultTemplate from '+/components/DefaultTemplate';

export default class WalletImportPage extends React.Component {
  render() {
    return (
      <DefaultTemplate {...this.props} title="Import Wallet">
        <ImportWallet {...this.props} />
      </DefaultTemplate>
    );
  }
}
