import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query SharePriceQuery($address: String!, $symbol: String!) {
    fund(address: $address) {
      id
      sharePrice(symbol: $symbol) {
        base {
          token {
            symbol
            decimals
            address
          }
          quantity
        }
        quote {
          token {
            symbol
            decimals
            address
          }
          quantity
        }
      }
    }
  }
`;

const SharePriceQuery = ({ address, symbol, children }) => (
  <Query query={query} skip={!symbol} ssr={false} errorPolicy="all" variables={{ symbol, address }}>
    {children}
  </Query>
);

export { SharePriceQuery };
