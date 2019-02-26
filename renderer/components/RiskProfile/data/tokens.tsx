import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query TokensQuery {
    quoteToken {
      address
      symbol
      decimals
    }

    tokens {
      address
      symbol
      decimals
    }
  }
`;

const TokensQuery = ({ children }) => (
  <Query query={query} ssr={false} errorPolicy="all">
    {children}
  </Query>
);

export { TokensQuery };
