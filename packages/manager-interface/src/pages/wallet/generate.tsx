import React from 'react';
import GenerateWallet from '+/components/GenerateWallet';
import DefaultTemplate from '+/components/DefaultTemplate';

const Page = props => (
  <DefaultTemplate {...props} title="Create Wallet">
    <GenerateWallet {...props} />
  </DefaultTemplate>
);

export default Page;
