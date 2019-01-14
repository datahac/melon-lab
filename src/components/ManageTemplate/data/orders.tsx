import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query OrdersQuery($base: String!, $quote: String!, $exchange: ExchangeEnum!) {
    orders(base: $base, quote: $quote, exchange: $exchange) {
      id
      trade {
        base {
          quantity
          token {
            symbol
            decimals
            address
          }
        }
        quote {
          quantity
          token {
            symbol
            decimals
            address
          }
        }
      }
      type
      exchange
    }
  }
`;

const OrdersQuery = ({ exchange, baseAsset, quoteAsset, children }) => (
  <Query
    query={query}
    variables={{
      exchange,
      base: baseAsset,
      quote: quoteAsset,
    }}
  >
    {children}
  </Query>
);

export default OrdersQuery;
