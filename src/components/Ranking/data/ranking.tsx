import gql from 'graphql-tag';
import { Query } from '~/apollo';

const query = gql`
  query RankingQuery {
    rankings {
      rank
      address
      name
      inception
      sharePrice
    }
  }
`;

const RankingQuery = ({ children }) => <Query query={query}>{children}</Query>;

export default RankingQuery;
