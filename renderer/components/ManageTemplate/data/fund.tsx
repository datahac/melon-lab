import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const query = gql`
  query FundQuery($address: String!) {
    totalFunds

    fund(address: $address) {
      id
      isShutdown
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

      managementFeeRate
      performanceFeeRate
      performanceFeePeriod
      sharePrice(symbol: "WETH") {
        base {
          token {
            symbol
            decimals
          }
          quantity
        }
        quote {
          token {
            symbol
            decimals
          }
          quantity
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
      personalStake @authenticated @account(arg: "investor") {
        quantity
        token {
          decimals
          symbol
        }
      }
      allowedExchanges

      policies {
        name
        address
        parameters
      }
    }
  }
`;

const FundQuery = ({ address, children }) => (
  <Query
    query={query}
    variables={{
      address,
    }}
    skip={!address}
    ssr={false}
    errorPolicy="all"
  >
    {children}
  </Query>
);

export default FundQuery;
