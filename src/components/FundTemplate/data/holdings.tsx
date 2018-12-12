import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query HoldingsQuery($address: String!) {
    fund(address: $address) {
      address
      holdings {
        balance {
          quantity
          token {
            symbol
          }
        }

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
