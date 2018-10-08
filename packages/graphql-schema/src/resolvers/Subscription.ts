import {
  getAggregatedObservable,
  Order,
} from '@melonproject/exchange-aggregator';
import BigNumber from 'bignumber.js';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import takeLast from '../utils/takeLast';
import withUnsubscribe from '../utils/withUnsubscribe';

const debug = require('debug')('melon-lab:graphql-schema:subscription');

const filterBuyOrders = R.filter<Order>(R.propEq('type', 'buy'));
const filterSellOrders = R.filter<Order>(R.propEq('type', 'sell'));

const accumulateSells = (accumulator: BigNumber, order: Order) => {
  const volume = accumulator.plus(order.sell.howMuch);
  return [volume, { order, volume }];
};

const accumulateBuys = (accumulator: BigNumber, order: Order) => {
  const volume = accumulator.plus(order.buy.howMuch);
  return [volume, { order, volume }];
};

export const orderbook = {
  resolve: (orders: Order[] | Error) => {
    if (orders instanceof Error) {
      throw orders;
    }

    const [totalBuyVolume, buyEntries] = R.compose(
      R.mapAccum(accumulateBuys, new BigNumber(0)),
      filterBuyOrders,
    )(orders);

    const [totalSellVolume, sellEntries] = R.compose(
      R.mapAccum(accumulateSells, new BigNumber(0)),
      filterSellOrders,
    )(orders);

    return {
      allOrders: orders,
      buyEntries,
      sellEntries,
      totalSellVolume,
      totalBuyVolume,
    };
  },
  subscribe: async (parent, args, context) => {
    const { pubsub, streams } = context;
    const { baseTokenSymbol, quoteTokenSymbol, exchanges } = args;
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const network = await takeLast(streams.network$);

    debug('Processed symbols.', {
      baseTokenSymbol,
      quoteTokenSymbol,
    });

    const orderbook$ = getAggregatedObservable(
      baseTokenSymbol,
      quoteTokenSymbol,
      exchanges,
      network,
      environment,
      config,
    );

    const channel = `orderbook:${baseTokenSymbol}/${quoteTokenSymbol}`;
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(orderbook$, iterator, publish);
  },
};

const balance = {
  resolve: balance => {
    return balance;
  },
  subscribe: async (parent, args, context) => {
    const { pubsub, loaders, streams } = context;
    const { address, token } = args;

    const getBalance = () => {
      switch (token) {
        case 'WETH':
          return loaders.nativeBalanceUncached(address);
        case 'ETH':
          return loaders.etherBalanceUncached(address);
        case 'MLN':
          return loaders.melonBalanceUncached(address);
      }

      return null;
    };

    const balance$ = streams.block$
      .debounceTime(5000)
      .switchMap(() => Rx.Observable.fromPromise(getBalance()))
      .distinctUntilChanged(R.equals);

    const channel = `balance:${address}:${token}`;
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(balance$, iterator, publish);
  },
};

export { Order };

export default {
  orderbook,
  balance,
};
