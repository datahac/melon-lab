import {
  getAggregatedObservable,
  Order,
} from '@melonproject/exchange-aggregator';
import BigNumber from 'bignumber.js';
import * as R from 'ramda';
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
    const { pubsub, network, config, environment } = context;
    const { baseTokenSymbol, quoteTokenSymbol, exchanges } = args;

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

const block = {
  resolve: (block) => {
    return block;
  },
  subscribe: async (parent, args, context) => {
    const { pubsub, block$ } = context;

    const channel = 'block';
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(block$, iterator, publish);
  },
};

export { Order };

export default {
  orderbook,
  block,
};
