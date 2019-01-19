import { Query } from '~/shared/graphql/apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    hasStoredWallet
  }
`;

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false}>
    {children}
  </Query>
);

export { WalletQuery };
