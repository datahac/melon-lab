import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const defaults = {
  network: null,
  currentBlock: null,
  nodeSynced: null,
  priceFeedUp: null,
  peerCount: null,
  blockOverdue: null,
  priceFeedUpdate: null,
};

export const NetworkContext = React.createContext(defaults);

export const networkQuery = gql`
  query NetworkQuery {
    network
    currentBlock
    nodeSynced
    priceFeedUp
    peerCount
    priceFeedUpdate
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

const networkSubscription = gql`
  subscription NetworkSubscription {
    network
  }
`;

const NetworkContextHandler = ({ children, ...props }) => {
  const [blockOverdue, setBlockOverdue] = useState(false);
  let unsubscribe;
  let timeout;

  useEffect(() => {
    unsubscribe = props.subscribe();

    return () => {
      unsubscribe && unsubscribe();
    };
  });

  useEffect(() => {
    if (blockOverdue) {
      setBlockOverdue(false);
    }

    timeout && clearTimeout(timeout);
    timeout = setTimeout(() => {
      setBlockOverdue(true);
    }, 120000); // Block overdue after 2 minutes
  }, [props.currentBlock]);

  return (
    <NetworkContext.Provider
      value={{
        ...defaults,
        blockOverdue,
        ...props,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};

export const NetworkProvider = ({ children }) => (
  <Query query={networkQuery} ssr={false} errorPolicy="all">
    {props => {
      const subscribe = () => {
        const subscribeToField = (subscription, field) => {
          return props.subscribeToMore({
            document: subscription,
            updateQuery: (previous, { subscriptionData: result }) => {
              const value = result && result.data && result.data[field];
              if (
                field === 'network' &&
                previous.network &&
                previous.network !== value
              ) {
                props.client.resetStore();

                return {
                  ...defaults,
                  [field]: value,
                };
              }

              return {
                ...defaults,
                ...previous,
                [field]: value,
              };
            },
          });
        };

        const subscriptions = [
          subscribeToField(nodeSyncedSubscription, 'nodeSynced'),
          subscribeToField(currentBlockSubscription, 'currentBlock'),
          subscribeToField(peerCountSubscription, 'peerCount'),
          subscribeToField(priceFeedUpSubscription, 'priceFeedUp'),
          subscribeToField(networkSubscription, 'network'),
        ];

        return () => {
          subscriptions.forEach(unsubscribe => {
            unsubscribe();
          });
        };
      };

      return (
        <NetworkContextHandler subscribe={subscribe} {...props.data}>
          {children}
        </NetworkContextHandler>
      );
    }}
  </Query>
);

export const NetworkConsumer = NetworkContext.Consumer;
