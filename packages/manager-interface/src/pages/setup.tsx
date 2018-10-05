import React from 'react';
import Layout from '+/components/Layout';
import Setup from '+/components/Setup';
import { withRouter } from 'next/router';
import { compose, lifecycle } from 'recompose';

const Page = props => (
  <Layout {...props}>
    <Setup {...props} />
  </Layout>
);

const withPageLifecycle = lifecycle({
  componentDidMount() {
    this.props.account && this.props.subscribeToNewBalance();
  },
});

export default compose(
  withRouter,
  withPageLifecycle,
)(Page);
