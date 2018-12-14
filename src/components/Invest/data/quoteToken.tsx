import { Query } from '~/apollo';
import gql from 'graphql-tag';

export const query = gql`
  query QuoteTokenQuery {
    quoteToken {
      symbol
      decimals
    }
  }
`;

const QuoteTokenQuery = ({ children }) => (
  <Query query={query} ssr={false}>
    {children}
  </Query>
);

export { QuoteTokenQuery };
