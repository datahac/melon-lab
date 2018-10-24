import React from 'react';
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
    eth: balance(address: $account, token: ETH)
    weth: balance(address: $account, token: WETH)
    mln: balance(address: $account, token: MLN)
  }
`;

const balanceSubscription = gql`
  subscription BalanceSubscription($account: String!, $token: TokenEnum!) {
    balance(address: $account, token: $token)
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
      <AccountConsumer>
        {(account) => (
          <Query query={balanceQuery} variables={{ account }} skip={!account} ssr={false}>
            {props => {
              const subscribe = () => {
                const subscribeToToken = (token, field) => {
                  return props.subscribeToMore({
                    document: balanceSubscription,
                    variables: { account, token },
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
                  subscriptions.forEach((unsubscribe) => {
                    unsubscribe();
                  });
                };
              };

              return (
                <SubscriptionHandler subscribe={subscribe} account={account}>
                  <BalanceContext.Provider value={account && props.data || defaults}>
                    {this.props.children}
                  </BalanceContext.Provider>
                </SubscriptionHandler>
              );
            }}
          </Query>
        )}
      </AccountConsumer>
    );
  }
}

export const BalanceConsumer = BalanceContext.Consumer;
