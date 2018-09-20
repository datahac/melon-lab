import { getKyberOrderbook } from '@melonproject/melon.js';
import * as R from 'ramda';
import * as Rx from 'rxjs';

const debug = require('debug')('melon-lab:exchange-aggregator:kyber-network');

const labelOrder = order => ({ ...order, exchange: 'KYBER_NETWORK' });
const labelOrders = orders => orders.map(labelOrder);

const getObservableOasisDex = (
  baseTokenSymbol,
  quoteTokenSymbol,
  environment,
) => {
  const orderbook$ = Rx.Observable.defer(() =>
    getKyberOrderbook(environment, { baseTokenSymbol, quoteTokenSymbol }),
  )
    .do(value => debug('Receiving values.', value))
    .distinctUntilChanged(R.equals)
    .map(labelOrders)
    .do(value => debug('Emitting order book.', value));

  // Repeat once every minute.
  return orderbook$.repeatWhen(Rx.operators.delay(60000));
};

export default getObservableOasisDex;
