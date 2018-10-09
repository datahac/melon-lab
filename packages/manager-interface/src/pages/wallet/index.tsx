import React from 'react';
import Wallet from '+/components/Wallet';
import Layout from '+/components/Layout';

const Page = props => (
  <Layout
    {...props}
    title={!props.account ? 'Setup your Wallet' : 'Your Wallet'}
    text={
      !props.account &&
      'Before you can setup your fund, you need to import, restore or create a wallet'
    }
    icon="icons_wallet"
  >
    <Wallet {...props} />
  </Layout>
);

export default Page;
