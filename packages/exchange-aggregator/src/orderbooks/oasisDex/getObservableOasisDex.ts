import { getOrderbook, getSymbol } from '@melonproject/melon.js';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import { tap, map, repeatWhen, distinctUntilChanged, delay } from 'rxjs/operators';

const debug = require('debug')('melon-lab:exchange-aggregator:oasis-dex');

const labelOrder = order => ({ ...order, exchange: 'OASIS_DEX' });
const labelOrders = orders => orders.map(labelOrder);

const getObservableOasisDex = (
  baseTokenSymbol,
  quoteTokenSymbol,
  environment,
) => {
  const orderbook$ = Rx.defer(() =>
    getOrderbook(environment, { baseTokenSymbol, quoteTokenSymbol }),
  ).pipe(
    tap(value => debug('Receiving values.', value)),
    distinctUntilChanged(R.equals),
    map(labelOrders),
    tap(value => debug('Emitting order book.', value)),
  );

  // Repeat once every minute.
  return orderbook$.pipe(repeatWhen((notifier) => notifier.pipe(delay(60000))));
};

export default getObservableOasisDex;
