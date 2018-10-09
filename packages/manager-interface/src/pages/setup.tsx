import React from 'react';
import Layout from '+/components/Layout';
import Setup from '+/components/Setup';
import { withRouter } from 'next/router';
import { compose } from 'recompose';

const Page = props => (
  <Layout {...props} title="Setup your Fund">
    <Setup {...props} />
  </Layout>
);

export default compose(
  withRouter,
)(Page);
