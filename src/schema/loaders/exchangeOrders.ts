import * as R from 'ramda';
import * as Rx from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Exchange, Network } from '@melonproject/exchange-aggregator/lib/types';
import { observeRadarRelay } from '@melonproject/exchange-aggregator/lib/exchanges/radar-relay';
import { observeKyber } from '@melonproject/exchange-aggregator/lib/exchanges/kyber';
import { observeEthfinex } from '@melonproject/exchange-aggregator/lib/exchanges/ethfinex';
import { fetchOasisDexOrders } from '@melonproject/exchange-aggregator/lib/exchanges/oasis-dex';
import { isSnapshotEvent } from '@melonproject/exchange-aggregator/lib/exchanges/debug';
import takeLast from '../utils/takeLast';
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
      environment,
      network: Network.KOVAN,
      pair: {
        base: getTokenBySymbol(environment, base),
        quote: getTokenBySymbol(environment, quote),
      },
    };

    const stream$ = (() => {
      switch (exchange) {
        case 'OASIS_DEX':
          return Rx.from(fetchOasisDexOrders(options));
        case 'RADAR_RELAY':
          return observeRadarRelay(options).pipe(
            filter(isSnapshotEvent),
            map(data => data.orders),
          );
        case 'KYBER_NETWORK':
          return observeKyber(options).pipe(
            filter(isSnapshotEvent),
            map(data => data.orders),
          );
        case 'ETHFINEX':
          return observeEthfinex(options).pipe(
            filter(isSnapshotEvent),
            map(data => data.orders),
          );
        default:
          throw new Error('Invalid exchange.');
      }
    })();

    return takeLast(stream$, 10000).catch(() => []);
  },
);
