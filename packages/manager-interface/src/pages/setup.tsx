import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Setup from '+/components/Setup';

const Page = props => (
  <DefaultTemplate {...props} title="Setup your Fund">
    <Setup {...props} />
  </DefaultTemplate>
);

export default Page;
