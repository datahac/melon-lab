import React from 'react';
import DefaultTemplate from '+/components/DefaultTemplate';
import Redeem from '+/components/Redeem';
import checkValidFund from '~/utils/checkValidFund';
import checkIsLoggedIn from '~/utils/checkIsLoggedIn';
import Error from '~/error';
import isError from '~/utils/isError';

export default class RedeemPage extends React.Component {
  static async getInitialProps(context) {
    const parameters = (context.req && context.req.query) || context.query;
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);
    const isValidFund = await checkValidFund(context.apolloClient, parameters.address);

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
      <DefaultTemplate title="Redeem">
        <Redeem address={this.props.address} />
      </DefaultTemplate>
    );
  }
}
