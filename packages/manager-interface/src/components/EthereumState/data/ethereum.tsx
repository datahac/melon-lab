import React from 'react';
import { Query } from '~/apollo';
import { lifecycle } from 'recompose';
import * as R from 'ramda';
import gql from 'graphql-tag';

const accountQuery = gql`
  query AccountQuery {
    defaultAccount @client
  }
`;

const ethereumQuery = gql`
  query EthereumQuery($account: String!, $authenticated: Boolean!) {
    network
    currentBlock
    nodeSynced
    priceFeedUp
    peerCount
    availableExchanges {
      value
      text
    }

    canonicalPriceFeedAddress:versionConfig(key: CANONICAL_PRICE_FEED_ADDRESS)
    competitionComplianceAddress:versionConfig(key: COMPETITION_COMPLIANCE_ADDRESS)
    onlyManagerCompetitionAddress:versionConfig(key: ONLY_MANAGER_COMPETITION_ADDRESS)
    noComplianceAddress:versionConfig(key: NO_COMPLIANCE_ADDRESS)

    associatedFund(address: $account) @include(if: $authenticated) {
      address
      name
    }
    eth: balance(address: $account, token: ETH) @include(if: $authenticated)
    weth: balance(address: $account, token: WETH) @include(if: $authenticated)
    mln: balance(address: $account, token: MLN) @include(if: $authenticated)
  }
`;

const currentBlockSubscription = gql`
  subscription CurrentBlockSubscription {
    currentBlock
  }
`;

const nodeSyncedSubscription = gql`
  subscription NodeSyncedSubscription {
    nodeSynced
  }
`;

const priceFeedUpSubscription = gql`
  subscription PriceFeedSubscription {
    priceFeedUp
  }
`;

const peerCountSubscription = gql`
  subscription PeerCountSubscription {
    peerCount
  }
`;

const balanceSubscription = gql`
  subscription BalanceSubscription($account: String!, $token: TokenEnum!) {
    balance(address: $account, token: $token)
  }
`;

const resultData = R.propOr({}, 'data');
const accountAddress = R.path(['data', 'defaultAccount']);

const EthereumQuery = ({ children }) => (
  <Query query={accountQuery} ssr={false}>
    {accountProps => {
      const account = accountAddress(accountProps);
      const authenticated = !!account;

      return (
        <Query
          query={ethereumQuery}
          variables={{
            account: account || '',
            authenticated,
          }}
        >
          {({ subscribeToMore, ...ethereumProps }) => {
            const subscribeToState = () => {
              const subscribeToField = (subscription, field) => {
                return subscribeToMore({
                  document: subscription,
                  updateQuery: (previous, { subscriptionData: result }) => {
                    return {
                      ...(previous || {}),
                      [field]: result && result.data && result.data[field],
                    };
                  },
                });
              };

              const subscriptions = [
                subscribeToField(nodeSyncedSubscription, 'nodeSynced'),
                subscribeToField(currentBlockSubscription, 'currentBlock'),
                subscribeToField(peerCountSubscription, 'peerCount'),
                subscribeToField(priceFeedUpSubscription, 'priceFeedUp'),
              ];

              return () => {
                subscriptions.forEach((unsubscribe) => {
                  unsubscribe();
                });
              };
            };

            const subscribeToBalance = () => {
              const subscribeToToken = (token, field) => {
                return subscribeToMore({
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
              <SubscriptionHandler account={account} subscribeToState={subscribeToState} subscribeToBalance={subscribeToBalance}>
                {children({
                  ...resultData(ethereumProps),
                  account,
                  loading: accountProps.loading || ethereumProps.loading,
                })}
              </SubscriptionHandler>
            )
          }}
        </Query>
      );
    }}
  </Query>
);

const SubscriptionHandler = lifecycle({
  componentDidMount() {
    this.unsubscribeState = this.props.subscribeToState();
  },
  componentDidUpdate(prevProps) {
    if (this.props.account && this.props.account !== prevProps.account) {
      this.unsubscribeBalances && this.unsubscribeBalances();
      this.unsubscribeBalances = this.props.subscribeToBalance();
    }
  },
  componentWillUnmount() {
    this.unsubscribeState && this.unsubscribeState();
    this.unsubscribeBalances && this.unsubscribeBalances();
  }
})(({ children }) => React.Children.only(children));

export default EthereumQuery;
