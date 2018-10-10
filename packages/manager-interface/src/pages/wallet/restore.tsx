import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import RestoreWallet from '+/components/RestoreWallet';

const Page = props => (
  <DefaultTemplate {...props} title="Restore Wallet">
    <RestoreWallet />
  </DefaultTemplate>
);

export default Page;
