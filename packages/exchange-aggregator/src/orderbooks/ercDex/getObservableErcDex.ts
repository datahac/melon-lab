import axios from 'axios';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import { takeUntil, repeatWhen, distinctUntilChanged, retry, map, filter, tap, catchError } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import formatRelayerOrderbook from '../../formatRelayerOrderbook';

// Isomorphic websocket implementation. Falls back to the standard browser
// protocol on the client.
import * as WebSocket from 'isomorphic-ws';

const debug = require('debug')('melon-lab:exchange-aggregator:erc-dex');

const fetchOrderbook = async (baseTokenAddress, quoteTokenAddress, network) => {
  const endpoint =
    network === 'KOVAN'
      ? 'https://api.ercdex.com/api/standard/42/v0/orderbook'
      : 'https://api.ercdex.com/api/standard/1/v0/orderbook';

  const params = {
    baseTokenAddress,
    quoteTokenAddress,
  };

  debug('Fetching orderbook', params, endpoint);

  const response = await axios.get(endpoint, {
    params,
  }).then((response) => {
    debug('Fetched orderbook', response);
    return response;
  }, (error) => {
    debug('Error fetching orderbook', error);

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(`Error while fetching orderbook from erc-dex: ${error.response.data.message}`);
    }

    throw error;
  });

  return response;
};

const getObservableErcDexNotifications = (
  baseTokenAddress,
  quoteTokenAddress,
) => {
  const channel = `aggregated-order-feed/${baseTokenAddress}/${quoteTokenAddress}`;

  debug('Connecting to websocket.', channel);

  const open$ = new Rx.Subject();
  const close$ = new Rx.Subject();
  const socket$ = webSocket({
    url: 'wss://api.ercdex.com',
    WebSocketCtor: WebSocket,
    openObserver: open$,
    closeObserver: close$,
  });

  open$.subscribe(event => {
    socket$.next(`sub:${channel}`);

    const observable$ = Rx.interval(5000).pipe(takeUntil(close$));
    observable$.subscribe(() => socket$.next('tick'));
  });

  const messages$ = socket$.pipe(
    retry(),
    filter(R.propEq('channel', channel)),
    tap(value => debug(`Received update notification.`, value)),
  );

  return messages$;
};

const getObservableErcDex = (
  baseTokenAddress,
  quoteTokenAddress,
  network,
  config,
) => {
  const format = formatRelayerOrderbook('ERC_DEX');
  const fetch$ = Rx.defer(() =>
    fetchOrderbook(baseTokenAddress, quoteTokenAddress, network),
  );

  const orderbook$ = fetch$.pipe(
    catchError((error) => {
      // If there is any error from the erc-dex api, just swallow it for now.
      // TODO: Revisit this at some point.
      return Rx.of({
        data: {
          bids: [],
          asks: [],
        },
      });
    }),
    map(response => response.data),
    distinctUntilChanged(R.equals),
    tap(value => debug('Extracting bids and asks.', value)),
    map(value => format(config, value.bids, value.asks)),
  );

  return orderbook$.pipe(repeatWhen(() =>
    getObservableErcDexNotifications(baseTokenAddress, quoteTokenAddress),
  ));
};

export default getObservableErcDex;
