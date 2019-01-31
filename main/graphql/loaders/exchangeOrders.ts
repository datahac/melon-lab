import * as R from 'ramda';
import {
  exchanges,
  Exchange,
  Network,
} from '@melonproject/exchange-aggregator';
import {
  Exchanges,
  Environment,
  getTokenBySymbol,
  getChainName,
} from '@melonproject/protocol';

import { getTestOrders } from './getTestOrders';
import { Kyber } from '@melonproject/exchange-aggregator/lib/exchanges/kyber/types';
import { OasisDex } from '@melonproject/exchange-aggregator/lib/exchanges/oasisdex/types';

// HACK: We need to cache the open orders here (Signed Orders) to
const offChainOrders = new Map();
export const getOffChainOrder = id => offChainOrders.get(id);
export const addOffChainOrder = order => offChainOrders.set(order.id, order);

export default R.curryN(
  4,
  async (
    environment: Environment,
    exchange: Exchange,
    base: string,
    quote: string,
  ) => {
    const chain = await getChainName(environment);
    const testingRelayers = ['development', 'test'].includes(
      process.env.NODE_ENV,
    );

    const options = {
      network: Network[chain.toUpperCase()],
      pair: {
        base: getTokenBySymbol(environment, base),
        quote: getTokenBySymbol(environment, quote),
      },
    };

    const result = await (() => {
      switch (exchange) {
        case 'OASIS_DEX':
          return exchanges.oasisdex.fetch({
            ...options,
            environment,
          } as OasisDex.FetchOptions);
        case 'RADAR_RELAY':
          return testingRelayers
            ? getTestOrders(base, quote, Exchanges.ZeroEx)
            : exchanges.radarrelay.fetch(options);
        case 'KYBER_NETWORK':
          return exchanges.kyber.fetch({
            ...options,
            environment,
          } as Kyber.FetchOptions);
        case 'ETHFINEX':
          return exchanges.ethfinex.fetch(options);
        default:
          throw new Error('Invalid exchange.');
      }
    })().catch(() => []);

    return result;
  },
);
