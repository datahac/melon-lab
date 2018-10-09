import React from 'react';
import GenerateWallet from '+/components/GenerateWallet';
import Layout from '+/components/Layout';

const Page = props => (
  <Layout {...props}
  title="Create Wallet">
    <GenerateWallet {...props} />
  </Layout>
);

export default Page;
