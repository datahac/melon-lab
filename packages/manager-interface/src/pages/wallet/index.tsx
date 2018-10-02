import React from 'react';
import Wallet from '+/components/Wallet';
import Layout from '+/components/Layout';

const Page = props => (
  <Layout {...props}>
    <Wallet {...props} />
  </Layout>
);

export default Page;
