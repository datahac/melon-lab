import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Ranking from '+/components/Ranking';
import GetStarted from '+/components/GetStarted';

const Page = props => (
  <DefaultTemplate {...props}>
    <GetStarted isHome {...props} />
    <Ranking {...props} />
  </DefaultTemplate>
);

export default Page;
