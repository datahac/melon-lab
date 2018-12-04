import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query FundQuery(
    $address: String!
    $account: String!
    $authenticated: Boolean!
  ) {
    # totalFunds

    fund(address: $address) {
      # rank # not implemented yet
      name
      # gav # accounting - calculations
      # nav # accounting - calculations
      # managementReward # accounting - calculations
      # performanceReward  # accounting - calculations
      # sharePrice # accounting - calculations
      # totalSupply # shares
      owner
      # inception #
      # personalStake(investor: $account) @include(if: $authenticated) # shares
    }
  }
`;

const FundQuery = ({ address, account, children }) => (
  <Query
    query={query}
    variables={{
      address,
      account: account || '',
      authenticated: !!account,
    }}
    skip={!address}
  >
    {children}
  </Query>
);

export default FundQuery;
