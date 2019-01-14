import * as R from 'ramda';
import * as Rx from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { balanceOf, getTokenBySymbol } from '@melonproject/protocol';
import { getEthBalance } from './symbolBalance';

export const getSymbolBalanceObservable = R.curryN(
  4,
  (environment, streams, symbol, address) => {
    if (symbol === 'ETH') {
      return streams.block$.pipe(
        switchMap(() => getEthBalance(environment, address)),
      );
    }

    const token = getTokenBySymbol(environment, symbol);
    const zen =
      token && balanceOf.observable(environment, token.address, { address });
    return (zen && Rx.from(zen)) || Rx.empty();
  },
);

export default getSymbolBalanceObservable;
