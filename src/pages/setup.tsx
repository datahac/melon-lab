import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Setup from '+/components/Setup';
import checkHasFund from '~/utils/checkHasFund';
import redirect from '~/utils/redirect';

export default class SetupPage extends React.Component {
  static async getInitialProps(context) {
    const hasFund = await checkHasFund(context.apolloClient);
    if (hasFund) {
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
