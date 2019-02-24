import React from 'react';
import InvestAssets from '+/components/InvestAssets';
import checkIsLoggedIn from '~/shared/utils/checkIsLoggedIn';
import Error from '~/error';
import isError from '~/shared/utils/isError';
import InvestTemplate from '+/components/InvestTemplate';
import checkIsManager from '~/shared/utils/checkIsManager';

export default class InvestAssetsPage extends React.Component {
  static async getInitialProps(context) {
    const parameters = (context.req && context.req.query) || context.query;
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    const isValidFund = await checkIsManager(
      context.apolloClient,
      parameters.address,
    );

    if (!isLoggedIn) {
      return { statusCode: 403 };
    }

    if (!isValidFund) {
      return { statusCode: 404 };
    }

    return {
      address: parameters.address,
    };
  }

  render() {
    const { statusCode } = this.props;
    if (statusCode && isError(statusCode)) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <InvestTemplate
        title="Allowed subscription assets"
        address={this.props.address}
      >
        <InvestAssets address={this.props.address} />
      </InvestTemplate>
    );
  }
}
