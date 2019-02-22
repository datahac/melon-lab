import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  query EnginePriceQuery {
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

const EnginePriceQuery = ({ children }) => (
  <Query query={query}>{children}</Query>
);

export default EnginePriceQuery;
