import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query EngineQuery {
    liquidEther {
      token {
        symbol
        decimals
      }
      quantity
    }
    enginePrice {
      base {
        token {
          symbol
          address
          decimals
        }
        quantity
      }
      quote {
        token {
          symbol
          address
          decimals
        }
        quantity
      }
    }
  }
`;

const EngineQuery = ({ children }) => <Query query={query}>{children}</Query>;

export default EngineQuery;
