import React from 'react';
import ManageTemplate from '+/components/ManageTemplate';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

export default class ManagePage extends React.Component {
  static async getInitialProps({ req, query }) {
    const parameters = (req && req.query) || query;

    return {
      address: parameters.address,
      quoteAsset: parameters.quote || config.quoteTokenDefault,
      baseAsset: parameters.base || config.baseTokenDefault,
    };
  }

  public render() {
    const { address, quoteAsset, baseAsset } = this.props;

    return (
      <ManageTemplate
        address={address}
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
      />
    );
  }
}
