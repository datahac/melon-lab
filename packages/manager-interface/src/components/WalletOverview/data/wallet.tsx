import { Query, Mutation } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    wallet @client {
      encryptedWallet
      accountAddress
      privateKey
    }
  }
`;

const mutation = gql`
  mutation DeleteWalletMutation {
    deleteWallet
  }
`;

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false}>
    {children}
  </Query>
);

const WalletMutation = ({ children }) => (
  <Mutation
    mutation={mutation}
    update={(cache, { data: { deleteWallet } }) => {
      if (!deleteWallet) {
        throw new Error('Failed to delete wallet.');
      }

      cache.writeQuery({
        query,
        data: {
          wallet: null,
        },
      });
    }}
  >
    {children}
  </Mutation>
);

export { WalletQuery, WalletMutation };
