import gql from 'graphql-tag';
import { Mutation, Query } from '~/apollo';

const mutation = gql`
  mutation LoadWallet($file: String!, $password: String!) {
    loadWallet(file: $file, password: $password) {
      accountAddress
      privateKey
      encryptedWallet
    }
  }
`;

const query = gql`
  query GetWalletQuery {
    storedWallet @client
  }
`;

const cacheQuery = gql`
  query GetWallet {
    accountAddress @client
    privateKey @client
  }
`;

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false}>
    {children}
  </Query>
);

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { loadWallet } }) => {
      cache.writeQuery({
        query: cacheQuery,
        data: loadWallet,
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export { WalletQuery, WalletMutation };
