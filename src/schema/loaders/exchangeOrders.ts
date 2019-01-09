import * as R from 'ramda';
import * as Rx from 'rxjs';
import { filter } from 'rxjs/operators';
import { Exchange, Network } from '@melonproject/exchange-aggregator/lib/types';
import { observeRadarRelay } from '@melonproject/exchange-aggregator/lib/exchanges/radar-relay';
import { observeKyber } from '@melonproject/exchange-aggregator/lib/exchanges/kyber';
import { observeEthfinex } from '@melonproject/exchange-aggregator/lib/exchanges/ethfinex';
import { isSnapshotEvent } from '@melonproject/exchange-aggregator/lib/exchanges/debug';
import { createToken } from '@melonproject/token-math/token';
import takeLast from '../utils/takeLast';

export default R.curryN(
  4,
  async (environment, exchange: Exchange, base: string, quote: string) => {
    const options = {
      network: Network.MAINNET,
      pair: {
        base: createToken(base),
        quote: createToken(quote),
      },
    };

    const stream$ = (() => {
      switch (exchange) {
        case 'OASIS_DEX':
          return Rx.throwError(new Error('Not implemented yet.'));
        case 'RADAR_RELAY':
          return observeRadarRelay(options);
        case 'KYBER_NETWORK':
          return observeKyber(options);
        case 'ETHFINEX':
          return observeEthfinex(options);
        default:
          throw new Error('Invalid exchange.');
      }
    })();

    const orders$ = stream$.pipe(filter(isSnapshotEvent));

    return takeLast(orders$, 10000)
      .then(data => data.orders)
      .catch(() => []);
  },
);
