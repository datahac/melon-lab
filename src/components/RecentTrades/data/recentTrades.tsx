import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query RecentTradesQuery($address: String!, $base: String!, $quote: String!) {
    fund(address: $address) {
      id
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
  }
`;

const RecentTradesQuery = ({
  fundAddress,
  baseAsset,
  quoteAsset,
  children,
}) => (
  <Query
    query={query}
    variables={{
      address: fundAddress,
      base: baseAsset,
      quote: quoteAsset,
    }}
    ssr={false}
  >
    {children}
  </Query>
);

export default RecentTradesQuery;
