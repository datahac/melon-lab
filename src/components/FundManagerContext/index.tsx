import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { AccountConsumer } from '+/components/AccountContext';

const defaults = {
  fund: null,
  isComplete: null,
  update: () => {
    throw new Error('Cannot set the current step without an account.');
  },
};

export const FundManagerContext = React.createContext(defaults);

export const fundManagerQuery = gql`
  query FundManagerQuery {
    fund: associatedFund @account(arg: "manager") @authenticated
  }
`;

export const fundQuery = gql`
  query FundManagerQuery($address: String!) {
    fundData: fund(address: $address) {
      isComplete
    }
  }
`;

export class FundManagerProvider extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          ({ results: [account], render }) => (
            <Query
              query={fundManagerQuery}
              variables={{ account }}
              skip={!account}
              children={render}
            />
          ),
          ({ results: [_, associatedFund], render }) => (
            <Query
              query={fundQuery}
              variables={{
                address:
                  associatedFund &&
                  associatedFund.data &&
                  associatedFund.data.fund,
              }}
              skip={
                !associatedFund &&
                !associatedFund.data &&
                !associatedFund.data.fund
              }
              children={render}
            />
          ),
        ]}
      >
        {([account, associatedFund, fund]) => {
          const data = account && {
            ...associatedFund.data,
            isComplete: fund.data.fundData.isComplete,
          };
          const value = data && {
            ...data,
            update: (cache, values) => {
              cache.writeQuery({
                query: fundManagerQuery,
                variables: {
                  account,
                },
                data: {
                  ...data,
                  ...values,
                },
              });
            },
          };

          return (
            <FundManagerContext.Provider
              value={{
                ...defaults,
                ...value,
              }}
            >
              {this.props.children}
            </FundManagerContext.Provider>
          );
        }}
      </Composer>
    );
  }
}

export const FundManagerConsumer = FundManagerContext.Consumer;
