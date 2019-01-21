import React from 'react';
import ManageTemplate from '+/components/ManageTemplate';

export default class ManagePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const parameters = (req && req.query) || query;

    return {
      address: parameters.address,
      quote: parameters.quote || 'WETH',
      base: parameters.base || 'MLN',
    };
  }

  public render() {
    const { address, quote, base } = this.props;

    return (
      <ManageTemplate address={address} quoteAsset={quote} baseAsset={base} />
    );
  }
}
