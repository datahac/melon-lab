import React, { useEffect } from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { AccountConsumer } from '+/components/AccountContext';

const defaults = {
  eth: null,
  weth: null,
};

export const BalanceContext = React.createContext(defaults);

export const balanceQuery = gql`
  query BalanceQuery($account: String!) {
    eth: balance(address: $account, symbol: "ETH") {
      quantity
      token {
        decimals
        symbol
        address
      }
    }
    weth: balance(address: $account, symbol: "WETH") {
      quantity
      token {
        decimals
        symbol
        address
      }
    }
  }
`;

const balanceSubscription = gql`
  subscription BalanceSubscription($account: String!, $symbol: String!) {
    balance(address: $account, symbol: $symbol) {
      quantity
      token {
        decimals
        symbol
        address
      }
    }
  }
`;

const SubscriptionHandler = ({ children, ...props }) => {
  let unsubscribe;

  useEffect(() => {
    if (props.account && !props.loading) {
      unsubscribe && unsubscribe();
      unsubscribe = props.subscribe();
    }
    return () => {
      unsubscribe && unsubscribe();
    };
  });

  return React.Children.only(children);
};

export const BalanceProvider = ({ children }) => (
  <Composer
    components={[
      <AccountConsumer />,
      ({ results: [account], render }) => (
        <Query
          query={balanceQuery}
          variables={{ account }}
          skip={!account}
          ssr={false}
          errorPolicy="all"
          children={render}
        />
      ),
    ]}
  >
    {([account, props]) => {
      const subscribe = () => {
        const subscribeToToken = (symbol, field) => {
          return props.subscribeToMore({
            document: balanceSubscription,
            variables: { account, symbol },
            updateQuery: (previous, { subscriptionData: result }) => {
              return {
                ...defaults,
                ...previous,
                [field]: result.data.balance,
              };
            },
          });
        };

        const subscriptions = [
          subscribeToToken('ETH', 'eth'),
          subscribeToToken('WETH', 'weth'),
        ];

        return () => {
          subscriptions.forEach(unsubscribe => {
            unsubscribe();
          });
        };
      };

      return (
        <SubscriptionHandler
          loading={props.loading}
          subscribe={subscribe}
          account={account}
        >
          <BalanceContext.Provider
            value={{
              ...defaults,
              ...((account && props.data) || {}),
            }}
          >
            {children}
          </BalanceContext.Provider>
        </SubscriptionHandler>
      );
    }}
  </Composer>
);

export const BalanceConsumer = BalanceContext.Consumer;
