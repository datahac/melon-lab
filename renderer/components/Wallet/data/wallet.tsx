import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    hasStoredWallet
  }
`;

const mutation = gql`
  mutation DeleteWalletMutation {
    deleteWallet
  }
`;

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false} errorPolicy="all">
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
