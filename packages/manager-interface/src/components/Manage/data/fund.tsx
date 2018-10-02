import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query FundQuery($address: String!, $account: String!, $authenticated: Boolean!) {
    totalFunds

    fund(address: $address) {
      rank
      name
      gav
      nav
      managementReward
      performanceReward
      sharePrice
      totalSupply
      owner
      inception
      address
      personalStake(investor: $account) @include(if: $authenticated)
    }
  }
`;

const FundQuery = ({ address, account, authenticated, children }) => (
  <Query
    query={query}
    variables={{
      address,
      account: account || '',
      authenticated,
    }}
    skip={!address}
  >
    {children}
  </Query>
);

export default FundQuery;
