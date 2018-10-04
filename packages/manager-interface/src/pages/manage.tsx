import React, { Component } from 'react';
import Layout from '+/components/Layout';
import Manage from '+/components/Manage';
import getConfig from 'next/config';

const { publicRuntimeConfig: config } = getConfig();

class Page extends Component {
  static async getInitialProps({ req, query }) {
    const parameters = req && req.query || query;

    return {
      address: parameters.address,
      quoteAsset: parameters.quote || config.quoteTokenDefault,
      baseAsset: parameters.base || config.baseTokenDefault,
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
