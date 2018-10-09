import React from 'react';
import Layout from '+/components/Layout';
import RestoreWallet from '+/components/RestoreWallet';

const Page = props => (
  <Layout {...props} title="Restore Wallet">
    <RestoreWallet />
  </Layout>
);

export default Page;
