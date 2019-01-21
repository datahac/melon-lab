import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AccountConsumer } from '+/components/AccountContext';

const defaults = {
  fund: null,
  routes: null,
  update: () => {
    throw new Error('Cannot set the current step without an account.');
  },
};

export const FundManagerContext = React.createContext(defaults);

export const fundManagerQuery = gql`
  query FundManagerQuery {
    fund: associatedFund @account(arg: "manager") @authenticated
    routes @account(arg: "manager") @authenticated {
      accountingAddress
      feeManagerAddress
      participationAddress
      policyManagerAddress
      sharesAddress
      tradingAddress
      vaultAddress
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
        ]}
      >
        {([account, associatedFund]) => {
          const data = account && {
            ...associatedFund.data,
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
                  routes: {
                    ...data.routes,
                    ...values.routes,
                  },
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
