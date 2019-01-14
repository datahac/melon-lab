import React from 'react';
import * as R from 'ramda';
import OrderBook from '~/components/OrderBook';
import Composer from 'react-composer';
import { Query } from '~/apollo';
import gql from 'graphql-tag';
import { aggregateOrders } from '@melonproject/exchange-aggregator/lib/exchanges/aggregate';

const query = gql`
  query OrdersQuery($base: String!, $quote: String!, $exchange: ExchangeEnum!) {
    orders(base: $base, quote: $quote, exchange: $exchange) {
      id
      trade {
        base {
          quantity
          token {
            symbol
            decimals
            address
          }
        }
        quote {
          quantity
          token {
            symbol
            decimals
            address
          }
        }
      }
      type
      exchange
    }
  }
`;

const OrdersQuery = ({ exchange, baseAsset, quoteAsset, children }) => (
  <Query
    query={query}
    variables={{
      exchange,
      base: baseAsset,
      quote: quoteAsset,
    }}
  >
    {children}
  </Query>
);

const AggregatedOrders = ({ baseAsset, quoteAsset, exchanges, children }) => (
  <Composer
    components={exchanges.map(exchange => (
      <OrdersQuery
        exchange={exchange}
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
      />
    ))}
  >
    {orderResponses => {
      const loading = !!orderResponses.find(R.propEq('loading', true));
      const orders = [].concat(
        ...orderResponses.map(R.pathOr([], ['data', 'orders'])),
      );
      const orderbook = aggregateOrders(orders);

      return children({
        ...orderbook,
        loading,
      });
    }}
  </Composer>
);

export default ({ baseAsset, quoteAsset, exchanges }) => (
  <AggregatedOrders
    exchanges={exchanges}
    quoteAsset={quoteAsset}
    baseAsset={baseAsset}
  >
    {({ asks, bids, loading }) => (
      <OrderBook loading={loading} bids={bids} asks={asks} />
    )}
  </AggregatedOrders>
);
