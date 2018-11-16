import { Query, Mutation } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    hasStoredWallet @client
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

      cache.writeQuery({
        query: gql`
          {
            hasStoredWallet
            defaultAccount
            allAccounts
          }
        `,
        data: {
          hasStoredWallet: false,
          defaultAccount: null,
          allAccounts: null,
        },
      });
    }}
  >
    {children}
  </Mutation>
);

export { WalletQuery, WalletMutation };
