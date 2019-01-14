import * as R from 'ramda';
import { Exchange, Network } from '@melonproject/exchange-aggregator/lib/types';
import { fetchEthfinexOrders } from '@melonproject/exchange-aggregator/lib/exchanges/ethfinex';
import { fetchOasisDexOrders } from '@melonproject/exchange-aggregator/lib/exchanges/oasis-dex';
import { Environment } from '@melonproject/protocol/lib/utils/environment/Environment';
import { getTokenBySymbol } from '@melonproject/protocol/lib/utils/environment/getTokenBySymbol';

export default R.curryN(
  4,
  async (
    environment: Environment,
    exchange: Exchange,
    base: string,
    quote: string,
  ) => {
    const options = {
      network: Network.KOVAN,
      pair: {
        base: getTokenBySymbol(environment, base),
        quote: getTokenBySymbol(environment, quote),
      },
    };

    const result = (() => {
      switch (exchange) {
        case 'OASIS_DEX':
          return fetchOasisDexOrders({
            ...options,
            environment,
          });
        case 'RADAR_RELAY':
          return Promise.resolve([]);
        case 'KYBER_NETWORK':
          return Promise.resolve([]);
        case 'ETHFINEX':
          return fetchEthfinexOrders(options);
        default:
          throw new Error('Invalid exchange.');
      }
    })();

    return result.catch(() => []);
  },
);
