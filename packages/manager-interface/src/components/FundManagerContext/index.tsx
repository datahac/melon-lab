import React from 'react';
import Composer from 'react-composer'
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
      <Composer components={[
        <AccountConsumer />,
        ({ results: [account], render }) => (
          <Query query={fundManagerQuery} variables={{ account }} skip={!account} children={render} />
        ),
      ]}>
        {([account, props]) => {
          const associatedFund = account && props.data && props.data.associatedFund;

          return (
            <FundManagerContext.Provider value={associatedFund}>
              {this.props.children}
            </FundManagerContext.Provider>
          );
        }}
      </Composer>
    );
  }
}

export const FundManagerConsumer = FundManagerContext.Consumer;
