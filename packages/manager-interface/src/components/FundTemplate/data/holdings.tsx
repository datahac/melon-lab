import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query HoldingsQuery($address: String!) {
    fund(address: $address) {
      address
      holdings {
        symbol
        balance
        price
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
