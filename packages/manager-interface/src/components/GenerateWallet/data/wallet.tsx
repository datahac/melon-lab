import gql from 'graphql-tag';
import { Mutation, Query } from '~/apollo';

const query = gql`
  query GetMnemonic {
    mnemonic
  }
`;

const mutation = gql`
  mutation restoreWallet($mnemonic: String!, $password: String!) {
    restoreWallet(mnemonic: $mnemonic, password: $password) {
      accountAddress
      privateKey
      encryptedWallet
    }
  }
`;

const cacheQuery = gql`
  query GetWallet {
    accountAddress @client
    privateKey @client
  }
`;

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false} fetchPolicy="network-only">
    {children}
  </Query>
);

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { restoreWallet } }) => {
      cache.writeQuery({
        query: cacheQuery,
        data: restoreWallet,
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export { WalletQuery, WalletMutation };
