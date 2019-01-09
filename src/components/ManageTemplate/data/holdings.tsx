import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query HoldingsQuery($address: String!) {
    fund(address: $address) {
      id
      address
      holdings {
        balance {
          quantity
          token {
            symbol
            decimals
            address
          }
        }

        price {
          base {
            quantity
            token {
              symbol
              decimals
            }
          }

          quote {
            quantity
            token {
              symbol
              decimals
            }
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
  >
    {children}
  </Query>
);

export default HoldingsQuery;
