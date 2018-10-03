import { Query, Mutation } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    wallet {
      encryptedWallet @client
      accountAddress @client
      privateKey @client
    }
  }
`;

const mutation = gql`
  mutation DeleteWalletMutation {
    deleteWallet @client
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

      localStorage.removeItem('wallet:melon:fund');
    
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
