import * as R from 'ramda';
import {
  exchanges,
  Exchange,
  Network,
} from '@melonproject/exchange-aggregator';
import {
  Environment,
  getTokenBySymbol,
  getChainName,
} from '@melonproject/protocol';

export default R.curryN(
  4,
  async (
    environment: Environment,
    exchange: Exchange,
    base: string,
    quote: string,
  ) => {
    const chain = await getChainName(environment);

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
          });
        case 'RADAR_RELAY':
          return exchanges.radarrelay.fetch(options);
        case 'KYBER_NETWORK':
          return exchanges.kyber.fetch(options);
        case 'ETHFINEX':
          return exchanges.ethfinex.fetch(options);
        default:
          throw new Error('Invalid exchange.');
      }
    })().catch(() => []);

    console.log(JSON.stringify(result, null, 2));

    return result;
  },
);
