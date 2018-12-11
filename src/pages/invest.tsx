import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Invest from '+/components/Invest';
import checkHasWallet from '~/utils/checkHasWallet';
import redirect from '~/utils/redirect';

export default class SetupPage extends React.Component {
  static async getInitialProps(context) {
    const parameters = (context.req && context.req.query) || context.query;
    const hasWallet = await checkHasWallet(context.apolloClient);
    if (!hasWallet) {
      redirect(context, '/wallet');
    }
    return {
      address: parameters.address,
    };
  }

  render() {
    return (
      <DefaultTemplate title="Invest">
        <Invest address={this.props.address} />
      </DefaultTemplate>
    );
  }
}
