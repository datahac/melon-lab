import { Query } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query RecentTradesQuery(
    $baseTokenSymbol: String!
    $quoteTokenSymbol: String!
  ) {
    recentTrades(
      baseTokenSymbol: $baseTokenSymbol
      quoteTokenSymbol: $quoteTokenSymbol
    ) {
      price
      quantity
      timestamp
      type
    }
  }
`;

const RecentTradesQuery = ({ baseAsset, quoteAsset, children }) => (
  <Query
    query={query}
    variables={{
      baseTokenSymbol: baseAsset,
      quoteTokenSymbol: quoteAsset,
    }}
    ssr={false}
  >
    {children}
  </Query>
);

export default RecentTradesQuery;
