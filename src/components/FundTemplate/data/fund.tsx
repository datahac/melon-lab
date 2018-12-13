import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query FundQuery(
    $address: String! # $account: String! # $authenticated: Boolean!
  ) {
    totalFunds

    fund(address: $address) {
      address
      rank
      name
      gav {
        quantity
        token {
          decimals
          symbol
        }
      }

      nav {
        quantity
        token {
          decimals
          symbol
        }
      }

      sharePrice {
        quantity
        token {
          decimals
          symbol
        }
      }

      totalSupply {
        quantity
        token {
          decimals
          symbol
        }
      }

      owner
      inception
      personalStake @from(arg: "investor") @authenticated {
        quantity
        token {
          decimals
          symbol
        }
      }
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
