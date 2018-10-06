import React from 'react';
import Layout from '+/components/Layout';
import Setup from '+/components/Setup';
import { withRouter } from 'next/router';
import { compose } from 'recompose';

const Page = props => (
  <Layout {...props}>
    <Setup {...props} />
  </Layout>
);

export default compose(
  withRouter,
)(Page);
