import * as R from 'ramda';
import * as Rx from 'rxjs';
import getObservableErcDex from './ercDex/getObservableErcDex';
import getObservableOasisDex from './oasisDex/getObservableOasisDex';
import getObservableRadarRelay from './radarRelay/getObservableRadarRelay';
import getObservableKyberNetwork from './kyberNetwork/getObservableKyberNetwork';
import { getAddress } from '@melonproject/melon.js';

import { ExchangeEnum, NetworkEnum, Order } from '../index';

const debug = require('debug')('melon-lab:exchange-aggregator');

export type ExchangeCreator = (
  baseTokenSymbol: string,
  quoteTokenSymbol: string,
  baseTokenAddress: string,
  quoteTokenAddress: string,
  network: NetworkEnum,
  environment: any,
  config: any,
) => Rx.Observable<Order[]>;

const exchangeToCreatorFunction: { [P in ExchangeEnum]: ExchangeCreator } = {
  RADAR_RELAY: (
    baseTokenSymbol,
    quoteTokenSymbol,
    baseTokenAddress,
    quoteTokenAddress,
    network,
    environment,
    config,
  ) =>
    getObservableRadarRelay(baseTokenAddress, quoteTokenAddress, network, config),
  OASIS_DEX: (
    baseTokenSymbol,
    quoteTokenSymbol,
    baseTokenAddress,
    quoteTokenAddress,
    network,
    environment,
    config,
  ) =>
    getObservableOasisDex(
      baseTokenSymbol,
      quoteTokenSymbol,
      environment,
    ),
  KYBER_NETWORK: (
    baseTokenSymbol,
    quoteTokenSymbol,
    baseTokenAddress,
    quoteTokenAddress,
    network,
    environment,
    config,
  ) =>
    getObservableKyberNetwork(
      baseTokenSymbol,
      quoteTokenSymbol,
      environment,
    ),
  ERC_DEX: (
    baseTokenSymbol,
    quoteTokenSymbol,
    baseTokenAddress,
    quoteTokenAddress,
    network,
    environment,
    config
  ) =>
    getObservableErcDex(baseTokenAddress, quoteTokenAddress, network, config),
};

const concatOrderbooks = R.reduce<Order[], Order[]>(R.concat, []);

const sortOrderBooks = R.sort<Order>((a, b) => {
  if (a.type === b.type) {
    if (a.type === 'buy') {
      return b.price.minus(a.price).toNumber();
    }

    if (a.type === 'sell') {
      return a.price.minus(b.price).toNumber();
    }
  }

  return a.type === 'buy' ? 1 : -1;
});

const getAggregatedObservable = (
  baseTokenSymbol: string,
  quoteTokenSymbol: string,
  exchanges: ExchangeEnum[] = ['RADAR_RELAY', 'OASIS_DEX', 'ERC_DEX', 'KYBER_NETWORK'],
  network: NetworkEnum = 'KOVAN',
  environment,
  config,
) => {
  const baseTokenAddress = getAddress(config, baseTokenSymbol);
  const quoteTokenAddress = getAddress(config, quoteTokenSymbol);

  const orderbooks = exchanges
    .map((name) => exchangeToCreatorFunction[name])
    .map(create => create(
      baseTokenSymbol,
      quoteTokenSymbol,
      baseTokenAddress,
      quoteTokenAddress,
      network,
      environment,
      config
    ).startWith([]));

  const combined$ = Rx.Observable.combineLatest(orderbooks)
    .skip(1)
    .do(value => debug('Emitting combined order book.'))
    .distinctUntilChanged(R.equals);

  // Concat and sort orders across all order books.
  return combined$.map(
    R.compose(
      sortOrderBooks,
      concatOrderbooks,
    ),
  );
};

export default getAggregatedObservable;
