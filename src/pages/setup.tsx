import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Setup from '+/components/Setup';

export default class SetupPage extends React.Component {
  static async getInitialProps(context) {
    // TODO: Check if the user is allowed to set up a fund.
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
