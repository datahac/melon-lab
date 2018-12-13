import * as R from 'ramda';
import * as Rx from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { balanceOf } from '@melonproject/protocol';
import { getEthBalance, extractQuantity } from './symbolBalance';

export const getSymbolBalanceObservable = R.curryN(
  4,
  (environment, streams, symbol, address) => {
    if (symbol === 'ETH') {
      const stream$ = streams.block$.pipe(
        switchMap(() => {
          return getEthBalance(environment, address);
        }),
      );

      return stream$.pipe(
        map(quantity => ({
          quantity: extractQuantity(quantity),
          token: {
            decimals: quantity.token.decimals,
            symbol: quantity.token.symbol,
            address: quantity.token.address,
          },
        })),
      );
    }

    const token = environment.deployment.thirdPartyContracts.tokens.find(
      item => item.symbol === symbol,
    );
    const zen = balanceOf.observable(environment, token.address, { address });

    return Rx.from(zen).pipe(
      map(quantity => ({
        quantity: extractQuantity(quantity),
        token: {
          decimals: quantity.token.decimals,
          symbol: quantity.token.symbol,
          address: quantity.token.address,
        },
      })),
    );
  },
);

export default getSymbolBalanceObservable;
