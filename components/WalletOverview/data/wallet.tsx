import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query GetWallet {
    hasStoredWallet
  }
`;

const WalletQuery = ({ children }) => (
  <Query query={query} ssr={false} errorPolicy="all">
    {children}
  </Query>
);

export { WalletQuery };
