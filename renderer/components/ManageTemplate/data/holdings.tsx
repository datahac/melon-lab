import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  fragment QuantityFragment on Quantity {
    quantity
    token {
      symbol
      decimals
      address
    }
  }

  query HoldingsQuery($address: String!) {
    fund(address: $address) {
      id
      address
      holdings {
        locked {
          ...QuantityFragment
        }

        balance {
          ...QuantityFragment
        }

        price {
          base {
            ...QuantityFragment
          }

          quote {
            ...QuantityFragment
          }
        }
        fraction
      }
    }
  }
`;

const HoldingsQuery = ({ address, children }) => (
  <Query
    query={query}
    variables={{
      address: address,
    }}
    ssr={false}
  >
    {children}
  </Query>
);

export default HoldingsQuery;
