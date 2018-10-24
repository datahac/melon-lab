import React from 'react';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { AccountConsumer } from '+/components/AccountContext';

export const FundManagerContext = React.createContext(null);

export const fundManagerQuery = gql`
  query FundManagerQuery($account: String!) {
    associatedFund(account: $account)
  }
`;

export class FundManagerProvider extends React.PureComponent {
  render() {
    return (
      <AccountConsumer>
        {(account) => (
          <Query query={fundManagerQuery} variables={{ account }} skip={!account}>
            {props => {
              return (
                <FundManagerContext.Provider value={account && props.data && props.data.associatedFund}>
                  {this.props.children}
                </FundManagerContext.Provider>
              );
            }}
          </Query>
        )}
      </AccountConsumer>
    );
  }
}

export const FundManagerConsumer = FundManagerContext.Consumer;
