import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query FundQuery($address: String!) {
    fund(address: $address) {
      id
      totalSupply {
        quantity
      }
      investAllowed {
        symbol
        address
        decimals
      }
    }
  }
`;

const FundQuery = ({ address, children }) => (
  <Query query={query} ssr={false} errorPolicy="all" variables={{ address }}>
    {children}
  </Query>
);

export { FundQuery };
