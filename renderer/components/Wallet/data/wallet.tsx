import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    hasStoredWallet
    ethAccounts
  }
`;

const deleteWalletMutation = gql`
  mutation DeleteWalletMutation {
    deleteWallet
  }
`;

const useFrameMutation = gql`
  mutation UseFrameMutation($address: String!) {
    useFrame(address: $address)
  }
`;

// const checkFrameAccountsMutation = gql``

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false} errorPolicy="all" pollInterval={2000}>
    {children}
  </Query>
);

const DeleteWalletMutation = ({ onCompleted, children }) => (
  <Mutation
    mutation={deleteWalletMutation}
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

const UseFrameMutation = ({ children, onCompleted }) => (
  <Mutation mutation={useFrameMutation} onCompleted={onCompleted}>
    {children}
  </Mutation>
);

export { WalletQuery, DeleteWalletMutation, UseFrameMutation };
