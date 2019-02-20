import React from 'react';
import Invest from '+/components/Invest';
import checkValidFund from '~/shared/utils/checkValidFund';
import checkIsLoggedIn from '~/shared/utils/checkIsLoggedIn';
import Error from '~/error';
import isError from '~/shared/utils/isError';
import InvestTemplate from '+/components/InvestTemplate';

export default class InvestPage extends React.Component {
  static async getInitialProps(context) {
    const parameters = (context.req && context.req.query) || context.query;
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    const isValidFund = await checkValidFund(
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
    const { statusCode, ...props } = this.props;
    if (statusCode && isError(statusCode)) {
      return <Error statusCode={statusCode} />;
    }

    return (
      <InvestTemplate title="Invest" address={this.props.address}>
        <Invest address={this.props.address} />
      </InvestTemplate>
    );
  }
}
