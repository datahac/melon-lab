import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const AccountContext = React.createContext(null);

export const accountQuery = gql`
  query AccountQuery {
    defaultAccount
  }
`;

export const AccountProvider = ({ children }) => (
  <Query query={accountQuery} ssr={false} errorPolicy="all">
    {props => (
      <AccountContext.Provider value={props.data && props.data.defaultAccount}>
        {children}
      </AccountContext.Provider>
    )}
  </Query>
);

export const AccountConsumer = AccountContext.Consumer;
