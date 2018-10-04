import React from 'react';
import Layout from '+/components/Layout';
import Ranking from '+/components/Ranking';
import GetStarted from '+/components/GetStarted';
import { lifecycle } from 'recompose';

const Page = props => (
  <Layout {...props}>
    <GetStarted isHome {...props} />
    <Ranking {...props} />
  </Layout>
);

const withPageLifecycle = lifecycle({
  componentDidMount() {
    this.props.account && this.props.subscribeToNewBalance();
  },
});

export default withPageLifecycle(Page);
