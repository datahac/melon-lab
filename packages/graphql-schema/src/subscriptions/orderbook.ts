import {
  getAggregatedObservable,
  Order,
} from '@melonproject/exchange-aggregator';
import BigNumber from 'bignumber.js';
import * as R from 'ramda';
import takeLast from '../utils/takeLast';
import toAsyncIterator from '../utils/toAsyncIterator';

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

export default {
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
    const { streams } = context;
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

    return toAsyncIterator(orderbook$);
  },
};
