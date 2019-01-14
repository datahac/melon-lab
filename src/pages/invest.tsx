import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Invest from '+/components/Invest';

export default class InvestPage extends React.Component {
  static async getInitialProps(context) {
    const parameters = (context.req && context.req.query) || context.query;

    // TODO: Check if the given fund exists.
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
