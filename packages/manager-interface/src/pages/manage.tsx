import React, { Component } from 'react';
import Layout from '+/components/Layout';
import Manage from '+/components/Manage';
import {
  extractAddress,
  extractBaseSymbol,
  extractQuoteSymbol,
} from '~/utils/parseUrl';

class Page extends Component {
  static async getInitialProps({ asPath }) {
    const address = extractAddress(asPath);
    const quoteAsset = extractQuoteSymbol(asPath);
    const baseAsset = extractBaseSymbol(asPath);

    return {
      address,
      quoteAsset,
      baseAsset,
    };
  }

  public render() {
    return (
      <Layout {...this.props}>
        <Manage {...this.props} />
      </Layout>
    );
  }
}

export default Page;
