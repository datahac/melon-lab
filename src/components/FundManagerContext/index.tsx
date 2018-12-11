import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { AccountConsumer } from '+/components/AccountContext';

const defaults = {
  fund: null,
  step: null,
  update: () => {
    throw new Error('Cannot set the current step without an account.');
  },
};

export const FundManagerContext = React.createContext(defaults);

export const fundManagerQuery = gql`
  query FundManagerQuery($account: String!) {
    fund: associatedFund(managerAddress: $account)
    step: stepFor(address: $account)
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
        {([account, result]) => {
          const data = account && result.data;
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
