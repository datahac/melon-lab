import React, { useState } from 'react';
import * as R from 'ramda';
import OrderBook from '~/components/OrderBook';
import Composer from 'react-composer';
import { Query } from '~/shared/graphql/apollo';
import gql from 'graphql-tag';
import {
  isBidOrder,
  isAskOrder,
  sortOrders,
  reduceOrderVolumes,
} from '@melonproject/exchange-aggregator';
import availableExchanges from '~/shared/utils/availableExchanges';

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
    ssr={false}
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

      const asks = orders
        .filter(isAskOrder)
        .sort(sortOrders)
        .reduce(reduceOrderVolumes, []);

      const bids = orders
        .filter(isBidOrder)
        .sort(sortOrders)
        .reduce(reduceOrderVolumes, []);

      return children({
        asks,
        bids,
        loading,
      });
    }}
  </Composer>
);

export default ({ baseAsset, quoteAsset }) => {
  const [selectedExchanges, setExchanges] = useState(
    Object.keys(availableExchanges),
  );

  const updateExchanges = e => {
    const value = e.target.value;
    const tempExchanges = selectedExchanges;

    if (value === 'ALL') {
      if (
        selectedExchanges.length ===
        Object.keys(availableExchanges).map(([key]) => key).length
      ) {
        return setExchanges([]);
      } else {
        return setExchanges(Object.keys(availableExchanges));
      }
    } else {
      if (!selectedExchanges.includes(value)) {
        tempExchanges.push(value);
      } else {
        const index = selectedExchanges.indexOf(value);
        tempExchanges.splice(index, 1);
      }
    }

    return setExchanges(tempExchanges);
  };

  return (
    <AggregatedOrders
      exchanges={selectedExchanges}
      quoteAsset={quoteAsset}
      baseAsset={baseAsset}
    >
      {({ asks, bids, loading }) => (
        <OrderBook
          loading={loading}
          bids={bids}
          asks={asks}
          availableExchanges={Object.entries(availableExchanges)}
          setExchange={updateExchanges}
          selectedExchanges={selectedExchanges}
        />
      )}
    </AggregatedOrders>
  );
};
