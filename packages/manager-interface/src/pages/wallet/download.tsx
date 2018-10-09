import React from 'react';
import Layout from '+/components/Layout';
import DownloadWallet from '+/components/DownloadWallet';

const Page = props => (
  <Layout {...props} title="Download Wallet">
    <DownloadWallet {...props} />
  </Layout>
);

export default Page;
