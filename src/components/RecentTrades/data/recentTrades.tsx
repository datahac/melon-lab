import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query RecentTradesQuery($base: String!, $quote: String!) {
    recentTrades(base: $base, quote: $quote) {
      price {
        base {
          quantity
          token {
            symbol
          }
        }

        quote {
          quantity
          token {
            symbol
          }
        }
      }
      timestamp
      type
    }
  }
`;

const RecentTradesQuery = ({ baseAsset, quoteAsset, children }) => (
  <Query
    query={query}
    variables={{
      base: baseAsset,
      quote: quoteAsset,
    }}
    ssr={false}
  >
    {children}
  </Query>
);

export default RecentTradesQuery;
