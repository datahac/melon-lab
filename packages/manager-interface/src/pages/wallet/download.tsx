import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import DownloadWallet from '+/components/DownloadWallet';

const Page = props => (
  <DefaultTemplate {...props} title="Download Wallet">
    <DownloadWallet {...props} />
  </DefaultTemplate>
);

export default Page;
