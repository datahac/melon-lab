import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query FundPoliciesQuery($address: String!) {
    fund(address: $address) {
      id
      policies {
        address
        name
        parameters
      }
    }
  }
`;

const FundPoliciesQuery = ({ address, children }) => (
  <Query query={query} ssr={false} errorPolicy="all" variables={{ address }}>
    {children}
  </Query>
);

export { FundPoliciesQuery };
