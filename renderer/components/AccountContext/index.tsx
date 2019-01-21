import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const AccountContext = React.createContext(null);

export const accountQuery = gql`
  query AccountQuery {
    defaultAccount
  }
`;

export class AccountProvider extends React.PureComponent {
  render() {
    return (
      <Query query={accountQuery} ssr={false} errorPolicy="all">
        {props => (
          <AccountContext.Provider
            value={props.data && props.data.defaultAccount}
          >
            {this.props.children}
          </AccountContext.Provider>
        )}
      </Query>
    );
  }
}

export const AccountConsumer = AccountContext.Consumer;
