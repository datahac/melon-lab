import { Query } from 'react-apollo';

import * as query from '~/queries/openOrders.gql';

const OpenOrdersQuery = ({ fundAddress, children }) => (
  <Query
    query={query}
    variables={{
      fundAddress,
    }}
    ssr={false}
    errorPolicy="all"
  >
    {children}
  </Query>
);

export { OpenOrdersQuery };
