import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const query = gql`
  query RankingQuery {
    rankings {
      id
      rank
      address
      name
      inception
      version
      gav {
        token {
          symbol
          decimals
        }
        quantity
      }
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

const RankingQuery = ({ children }) => (
  <Query query={query} ssr={false} errorPolicy="all">
    {children}
  </Query>
);

export default RankingQuery;
