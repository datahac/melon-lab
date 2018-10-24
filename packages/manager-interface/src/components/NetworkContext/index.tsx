import React from 'react';
import gql from 'graphql-tag';
import { Query } from '~/apollo';

const defaults = {
  network: null,
  currentBlock: null,
  nodeSynced: null,
  priceFeedUp: null,
  peerCount: null,
  blockOverdue: null,
};

export const NetworkContext = React.createContext(defaults);

export const networkQuery = gql`
  query NetworkQuery {
    network
    currentBlock
    nodeSynced
    priceFeedUp
    peerCount
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

class NetworkContextHandler extends React.Component {
  state = {
    blockOverdue: false,
  };

  componentDidMount() {
    this.unsubscribe = this.props.subscribe();
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  componentDidUpdate(prevProps) {
    const currentBlock = this.props.network.currentBlock;
    const previousBlock = prevProps.network.currentBlock;

    if (currentBlock !== previousBlock) {
      if (this.state.blockOverdue) {
        this.setState({
          blockOverdue: false,
        });
      }

      this.timeout && clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.setState({
          blockOverdue: true,
        });
      }, 60000);
    }
  }

  render() {
    return (
      <NetworkContext.Provider value={{
        blockOverdue: this.state.blockOverdue,
        network: this.props.network,
        currentBlock: this.props.currentBlock,
        nodeSynced: this.props.nodeSynced,
        priceFeedUp: this.props.priceFeedUp,
        peerCount: this.props.peerCount,
      }}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}

export class NetworkProvider extends React.PureComponent {
  render() {
    return (
      <Query query={networkQuery}>
        {props => {
          const subscribe = () => {
            const subscribeToField = (subscription, field) => {
              return props.subscribeToMore({
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

          return (
            <NetworkContextHandler subscribe={subscribe} {...props.data}>
              {this.props.children}
            </NetworkContextHandler>
          );
        }}
      </Query>
    );
  }
}

export const NetworkConsumer = NetworkContext.Consumer;
