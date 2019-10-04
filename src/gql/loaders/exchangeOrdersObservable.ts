import * as R from 'ramda';
import * as Rx from 'rxjs';
import { exchanges, Exchange, Network } from '@melonproject/exchange-aggregator';
import { Environment, getTokenBySymbol, getChainName } from '@melonproject/protocol';
import { OasisDex } from '@melonproject/exchange-aggregator/lib/exchanges/oasisdex/types';
import { Kyber } from '@melonproject/exchange-aggregator/lib/exchanges/kyber/types';

export default R.curryN(4, async (environment: Environment, exchange: Exchange, base: string, quote: string) => {
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
      } as OasisDex.WatchOptions);
    case 'RADAR_RELAY':
      return exchanges.radarrelay.watch(options);
    case 'KYBER_NETWORK':
      return exchanges.kyber.watch({
        ...options,
        environment,
      } as Kyber.WatchOptions);
    case 'ETHFINEX':
      return exchanges.ethfinex.watch(options);
    default:
      return Rx.empty();
  }
});
