import React from 'react';
import Convert from '+/components/Convert';
import checkIsLoggedIn from '~/shared/utils/checkIsLoggedIn';
import Error from '~/error';
import isError from '~/shared/utils/isError';
import ConvertTemplate from '+/components/ConvertTemplate';

export default class InvestPage extends React.Component {
  static async getInitialProps(context) {
    const parameters = (context.req && context.req.query) || context.query;
    const isLoggedIn = await checkIsLoggedIn(context.apolloClient);

    if (!isLoggedIn) {
      return { statusCode: 403 };
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
      <ConvertTemplate title="Convert" address={this.props.address}>
        <Convert address={this.props.address} />
      </ConvertTemplate>
    );
  }
}
