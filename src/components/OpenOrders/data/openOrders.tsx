import { Query, Mutation } from '~/apollo';
import gql from 'graphql-tag';

const query = gql`
  query OpenOrdersQuery($address: String!) {
    openOrders(address: $address) {
      ... on OasisDexOrder {
        id
        isActive
        exchange
        exchangeContractAddress
        type
        price
        timestamp
        buy {
          howMuch
          symbol
        }
        sell {
          howMuch
          symbol
        }
      }
    }
  }
`;

const mutation = gql`
  mutation cancelOpenOrder(
    $orderId: String!
    $fundAddress: String!
    $makerAssetSymbol: String!
    $takerAssetSymbol: String!
  ) {
    cancelOpenOrder(
      orderId: $orderId
      fundAddress: $fundAddress
      makerAssetSymbol: $makerAssetSymbol
      takerAssetSymbol: $takerAssetSymbol
    ) {
      type
    }
  }
`;

const OpenOrdersQuery = ({ address, children }) => (
  <Query
    query={query}
    variables={{
      address,
    }}
    ssr={false}
  >
    {children}
  </Query>
);

const OpenOrdersMutation = ({ children }) => (
  <Mutation mutation={mutation}>{children}</Mutation>
);

export { OpenOrdersMutation, OpenOrdersQuery };
