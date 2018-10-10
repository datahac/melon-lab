import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import LoadWallet from '+/components/LoadWallet';

const Page = props => (
  <DefaultTemplate {...props} title="Load Wallet">
    <LoadWallet />
  </DefaultTemplate>
);

export default Page;
