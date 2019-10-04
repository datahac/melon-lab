import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query RequestQuery($fundAddress: String!, $userAddress: String!) {
    hasActiveRequest(fundAddress: $fundAddress, userAddress: $userAddress) {
      invest {
        quantity
      }
      shares {
        quantity
      }
      waitingTime
      isExpired
    }
  }
`;

const RequestQuery = ({ fundAddress, userAddress, children }) => (
  <Query query={query} ssr={false} errorPolicy="all" variables={{ fundAddress, userAddress }} skip={!userAddress}>
    {children}
  </Query>
);

export { RequestQuery };
