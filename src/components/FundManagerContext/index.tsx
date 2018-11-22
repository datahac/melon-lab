import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { AccountConsumer } from '+/components/AccountContext';
import { ConfigurationConsumer } from '+/components/ConfigurationContext';

export const FundManagerContext = React.createContext(null);

export const fundManagerQuery = gql`
  query FundManagerQuery($account: String!, $contract: String!) {
    associatedFund(managerAddress: $account, contractAddress: $contract)
  }
`;

export class FundManagerProvider extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          <ConfigurationConsumer />,
          ({ results: [account, { fundFactory }], render }) => (
            <Query
              query={fundManagerQuery}
              variables={{ account, contract: fundFactory }}
              skip={!account}
              children={render}
            />
          ),
        ]}
      >
        {([account, props]) => {
          const associatedFund =
            account && props.data && props.data.associatedFund;

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
