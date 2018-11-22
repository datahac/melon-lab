import React from 'react';
import Composer from 'react-composer';
import gql from 'graphql-tag';
import { Query } from '~/apollo';
import { AccountConsumer } from '+/components/AccountContext';

const defaults = {
  eth: null,
  weth: null,
  mln: null,
};

export const BalanceContext = React.createContext(defaults);

export const balanceQuery = gql`
  query BalanceQuery($account: String!) {
    eth: balance(address: $account, symbol: ETH)
    weth: balance(address: $account, symbol: WETH)
    mln: balance(address: $account, symbol: MLN)
  }
`;

const balanceSubscription = gql`
  subscription BalanceSubscription($account: String!, $symbol: TokenEnum!) {
    balance(address: $account, symbol: $symbol)
  }
`;

class SubscriptionHandler extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.account && this.props.account !== prevProps.account) {
      this.unsubscribe && this.unsubscribe();
      this.unsubscribe = this.props.subscribe();
    }
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export class BalanceProvider extends React.PureComponent {
  render() {
    return (
      <Composer
        components={[
          <AccountConsumer />,
          ({ results: [account], render }) => (
            <Query
              query={balanceQuery}
              variables={{ account }}
              skip={!account}
              ssr={false}
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
                    ...(previous || {}),
                    [field]: result && result.data && result.data.balance,
                  };
                },
              });
            };

            const subscriptions = [
              subscribeToToken('ETH', 'eth'),
              subscribeToToken('WETH', 'weth'),
              subscribeToToken('MLN', 'mln'),
            ];

            return () => {
              subscriptions.forEach(unsubscribe => {
                unsubscribe();
              });
            };
          };

          return (
            <SubscriptionHandler subscribe={subscribe} account={account}>
              <BalanceContext.Provider
                value={{
                  ...defaults,
                  ...((account && props.data) || {}),
                }}
              >
                {this.props.children}
              </BalanceContext.Provider>
            </SubscriptionHandler>
          );
        }}
      </Composer>
    );
  }
}

export const BalanceConsumer = BalanceContext.Consumer;
