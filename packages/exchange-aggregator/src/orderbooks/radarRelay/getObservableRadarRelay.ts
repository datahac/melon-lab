import * as R from 'ramda';
import * as Rx from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { distinctUntilChanged, retry, filter, scan, timeout, tap, map, takeUntil, catchError } from 'rxjs/operators';
import formatRelayerOrderbook from '../../formatRelayerOrderbook';

// Isomorphic websocket implementation. Falls back to the standard browser
// protocol on the client.
import * as WebSocket from 'isomorphic-ws';

const debug = require('debug')('melon-lab:exchange-aggregator:radar-relay');

const subscribeMessage = (baseTokenAddress, quoteTokenAddress) =>
  JSON.stringify({
    type: 'subscribe',
    channel: 'orderbook',
    requestId: 1,
    payload: {
      baseTokenAddress,
      quoteTokenAddress,
      snapshot: true,
      limit: 1000,
    },
  });

// @TODO: Finish this type.
interface RelayOrder {
  salt: string;
  expirationUnixTimestampSec: string;
}

interface AsksAndBids {
  asks: RelayOrder[];
  bids: RelayOrder[];
}

interface SnapshotMessage {
  type: 'snapshot';
  payload: AsksAndBids;
}

interface UpdateMessage {
  type: 'update';
  payload: RelayOrder;
}

const isSnapshotMessage = R.propEq('type', 'snapshot') as (
  payload: any,
) => payload is SnapshotMessage;

const isUpdateMessage = R.propEq('type', 'update') as (
  payload: any,
) => payload is UpdateMessage;

const scanMessages: (
  carry: AsksAndBids,
  current: SnapshotMessage | UpdateMessage,
) => AsksAndBids = R.cond([
  [
    (carry: AsksAndBids, current: SnapshotMessage) => {
      return isSnapshotMessage(current);
    },
    (carry: AsksAndBids, current: SnapshotMessage) => {
      return current.payload;
    },
  ],
  [
    (carry: AsksAndBids, current: SnapshotMessage) => {
      return isUpdateMessage(current);
    },
    (carry: AsksAndBids, current: UpdateMessage) => {
      return updateAsksAndBids(carry, current.payload);
    },
  ],
  [R.T, R.identity],
]);

const updateAsksAndBids = (state: AsksAndBids, order: RelayOrder) => {
  // @TODO: Implement update logic.
  return state;
};

const getObservableRadarRelay = (
  baseTokenAddress,
  quoteTokenAddress,
  network,
  config,
) => {
  const url =
    network === 'KOVAN'
      ? 'wss://ws.kovan.radarrelay.com/0x/v0/ws'
      : 'wss://api.radarrelay.com/0x/v0/ws';

  const open$ = new Rx.Subject();
  const close$ = new Rx.Subject();
  const socket$ = webSocket({
    url,
    WebSocketCtor: WebSocket,
    openObserver: open$,
    closeObserver: close$,
  });

  const message = subscribeMessage(baseTokenAddress, quoteTokenAddress);

  open$.subscribe(event => {
    socket$.next(message);

    const observer$ = Rx.interval(5000).pipe(takeUntil(close$));
    observer$.subscribe(() => socket$.next('tick'));
  });

  const format = formatRelayerOrderbook('RADAR_RELAY');

  const messages$ = socket$.pipe(
    retry(),
    filter(R.propEq('channel', 'orderbook')),
    filter(R.anyPass([isSnapshotMessage, isUpdateMessage]) as (
      value,
    ) => value is SnapshotMessage | UpdateMessage),
    tap(value => debug('Processing snapshot or update message.', value)),
    tap(value => socket$.next(message)),
    scan<SnapshotMessage | UpdateMessage, AsksAndBids>(scanMessages, {
      bids: [],
      asks: [],
    }),
    distinctUntilChanged(R.equals),
    tap(value => debug('Extracting bids and asks.', value)),
    map(value => format(config, value.bids, value.asks)),
    tap(value => debug('Emitting order book.', value)),
  );

  const timeout$ = (new Rx.Observable((observer) => {
    messages$.subscribe((message) => {
      observer.next(message);
    }, (error) => {
      observer.error(error);
    });
  }));

  return timeout$.pipe(
    timeout(2000),
    catchError((error) => {
      debug('Error', error);
      return Rx.of([]);
    }),
  );
};

export default getObservableRadarRelay;
