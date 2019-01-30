import * as R from 'ramda';
import * as Rx from 'rxjs';
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
      network: Network[chain.toUpperCase()] as Network,
      pair: {
        base: getTokenBySymbol(environment, base),
        quote: getTokenBySymbol(environment, quote),
      },
    };

    switch (exchange) {
      case 'OASIS_DEX':
        return exchanges.oasisdex.watch({
          ...options,
          environment,
        });
      case 'RADAR_RELAY':
        return exchanges.radarrelay.watch(options);
      case 'KYBER_NETWORK':
        return exchanges.kyber.watch(options);
      case 'ETHFINEX':
        return exchanges.ethfinex.watch(options);
      default:
        return Rx.throwError(new Error('Invalid exchange.'));
    }
  },
);
