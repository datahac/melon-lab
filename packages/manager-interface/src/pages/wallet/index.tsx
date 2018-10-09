import React from 'react';
import Wallet from '+/components/Wallet';
import Layout from '+/components/Layout';
import Link from '~/blocks/Link';

const Page = props => (
  <Layout
    {...props}
    title={!props.account ? 'Setup your Wallet' : 'Your Wallet'}
    text={
      !props.account ? (
        'Before you can setup your fund, you need to import, restore or create a wallet'
      ) : (
        <Link
          title="Your ethereum address. Use this for white listing on ico.bitcoinsuisse.ch"
          target="_blank"
          href={{
            pathname: `https://${
              props.network === 'KOVAN' ? 'kovan.' : ''
            }etherscan.io/address/${props.account}`,
          }}
        >
          {props.account}
        </Link>
      )
    }
    icon="icons_wallet"
  >
    <Wallet {...props} />
  </Layout>
);

export default Page;
