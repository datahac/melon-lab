import React from 'react';
import Layout from '+/components/Layout';
import ImportWallet from '+/components/ImportWallet';

const Page = props => (
  <Layout {...props}>
    <ImportWallet />
  </Layout>
);

export default Page;
