import React from 'react';
import Layout from '+/components/Layout';
import LoadWallet from '+/components/LoadWallet';

const Page = props => (
  <Layout {...props} title="Load Wallet">
    <LoadWallet />
  </Layout>
);

export default Page;
