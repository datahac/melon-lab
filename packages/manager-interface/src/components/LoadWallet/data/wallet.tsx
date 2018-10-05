import gql from 'graphql-tag';
import { Mutation, Query } from '~/apollo';

const mutation = gql`
  mutation DecryptWallet($file: String!, $password: String!) {
    decryptWallet(wallet: $file, password: $password) {
      accountAddress
      privateKey
      encryptedWallet
    }
  }
`;

const query = gql`
  query GetWalletQuery {
    wallet {
      encryptedWallet
      accountAddress
      privateKey
    }
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
    update={(cache, { data: { decryptWallet } }) => {
      cache.writeQuery({
        query: query,
        data: {
          wallet: decryptWallet,
        },
      });
    }}
    onCompleted={onCompleted}
  >
    {children}
  </Mutation>
);

export { WalletQuery, WalletMutation };
