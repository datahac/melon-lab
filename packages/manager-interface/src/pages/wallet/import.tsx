import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import ImportWallet from '+/components/ImportWallet';

const Page = props => (
  <DefaultTemplate {...props} title="Import Wallet">
    <ImportWallet />
  </DefaultTemplate>
);

export default Page;
