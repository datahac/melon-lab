import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Setup from '+/components/Setup';
import checkHasWallet from '~/utils/checkHasWallet';
import redirect from '~/utils/redirect';

export default class SetupPage extends React.Component {
  static async getInitialProps(context) {
    const hasWallet = await checkHasWallet(context.apolloClient);
    if (!hasWallet) {
      redirect(context, '/wallet');
    }

    return {};
  }

  render() {
    return (
      <DefaultTemplate title="Setup your Fund">
        <Setup />
      </DefaultTemplate>
    );
  }
}
