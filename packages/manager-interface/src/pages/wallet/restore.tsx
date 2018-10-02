import React from 'react';
import Layout from '+/components/Layout';
import RestoreWallet from '+/components/RestoreWallet';

const Page = props => (
  <Layout {...props}>
    <RestoreWallet />
  </Layout>
);

export default Page;
