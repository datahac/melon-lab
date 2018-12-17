import { Query } from '~/apollo';
import gql from 'graphql-tag';

export const query = gql`
  query InvestQuery($address: String!) {
    fund(address: $address) {
      sharePrice {
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
    }
  }
`;

const FundInvestQuery = ({ address, children }) => (
  <Query query={query} ssr={false} variables={{ address }}>
    {children}
  </Query>
);

export { FundInvestQuery };
