import { Query, Mutation } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetAccountAddress {
    accountAddress @client
    privateKey @client
    storedWallet @client
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
      cache.writeQuery({
        query,
        data: { ...deleteWallet },
      });
    }}
  >
    {children}
  </Mutation>
);

export { WalletQuery, WalletMutation };
