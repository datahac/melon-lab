import React, { useState } from 'react';
import { useEventCallback } from "rxjs-hooks";
import { scan, map, combineLatest, filter } from "rxjs/operators";
import * as R from 'ramda';
import OrderBook from '~/components/OrderBook';
import Composer from 'react-composer';
import { Subscription } from 'react-apollo';
import {
  isBidOrder,
  isAskOrder,
  sortOrders,
  reduceOrderVolumes,
  reduceOrderEvents,
} from '@melonproject/exchange-aggregator';
import availableExchanges from '~/shared/utils/availableExchanges';
import { OrdersSubscription as query } from '~/queries/OrdersSubscription.gql';

const OrdersSubscription = ({ eventCallback, exchange, baseAsset, quoteAsset, children }) => (
  <Subscription
    ssr={false}
    subscription={query}
    variables={{
      exchange,
      base: baseAsset,
      quote: quoteAsset,
    }}
    onSubscriptionData={({ subscriptionData: { data } }) => {
      eventCallback(data.orders);
    }}
  >
    {children}
  </Subscription>
);

const AggregatedOrders = ({ eventCallback, baseAsset, quoteAsset, exchanges, children }) => (
  <Composer
    components={exchanges.map(exchange => (
      <OrdersSubscription
        eventCallback={eventCallback}
        exchange={exchange}
        quoteAsset={quoteAsset}
        baseAsset={baseAsset}
      />
    ))}
  >
    {orderResponses => {
      const loading = !!orderResponses.find(R.propEq('loading', true));
      return children({ loading });
    }}
  </Composer>
);

const useExchangeSelector = (availableExchangesKeys) => {
  const [current, set] = useState(availableExchangesKeys);

  const setFromEvent = event => {
    const value = event.target.value;

    if (value === 'ALL') {
      const unselect = current.length === availableExchangesKeys.length;
      return set(unselect ? [] : availableExchangesKeys);
    }

    if (!current.includes(value)) {
      return set([...current, value]);
    }

    const index = current.indexOf(value);
    return set([].concat(current.slice(0, index), current.slice(index + 1)));
  };

  return [current, setFromEvent];
};

export default ({ baseAsset, quoteAsset, isManager, setOrder }) => {
  const allExchanges = Object.entries(availableExchanges);
  const allExchangesKeys = Object.keys(availableExchanges);
  const [selectedExchanges, updateExchanges] = useExchangeSelector(allExchangesKeys);

  const [eventCallback, [asks, bids]] = useEventCallback(
    (events$, inputs$, _) => (events$ as any).pipe(
      scan((carry, events) => events.reduce(reduceOrderEvents, carry), []),
      combineLatest(inputs$, (orders, [exchanges]) => {
        const filter = R.compose(R.includes(R.__, exchanges), R.prop('exchange'));
        return orders.filter(filter);
      }),
      map(orders => {
        const asks = orders
          .filter(isAskOrder)
          .sort(sortOrders)
          .reverse()
          .reduce(reduceOrderVolumes, []);

        const bids = orders
          .filter(isBidOrder)
          .sort(sortOrders)
          .reduce(reduceOrderVolumes, []);

        return [asks, bids];
      }),
    ),
    [[], []],
    [selectedExchanges]
  );

  return (
    <AggregatedOrders
      quoteAsset={quoteAsset}
      baseAsset={baseAsset}
      exchanges={selectedExchanges}
      eventCallback={eventCallback}
    >
      {({ loading }) => (
        <OrderBook
          loading={loading}
          bids={bids}
          asks={asks}
          availableExchanges={allExchanges}
          setExchange={updateExchanges}
          selectedExchanges={selectedExchanges}
          isManager={isManager}
          setOrder={setOrder}
        />
      )}
    </AggregatedOrders>
  );
};
