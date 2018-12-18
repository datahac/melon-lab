import gql from 'graphql-tag';
import { Query } from '~/apollo';

const query = gql`
  query RankingQuery {
    rankings {
      rank
      address
      name
      inception
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

const RankingQuery = ({ children }) => <Query query={query}>{children}</Query>;

export default RankingQuery;
