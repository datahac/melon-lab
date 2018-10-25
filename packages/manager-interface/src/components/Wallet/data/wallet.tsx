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

const WalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={mutation}
    onCompleted={onCompleted}
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
