import { fork } from 'redux-saga/effects';

import administration from './administration';
import app from './app';
import ethereum from './ethereum';
import fund from './fund';
import holdings from './holdings';
import openOrders from './openOrders';
import orderbook from './orderbook';
import participation from './participation';
import ranking from './ranking';
import recentTrades from './recentTrades';
import setup from './setup';
import tracker from './tracker';
import trade from './trade';
import tradeHistory from './tradeHistory';
import wallet from './wallet';

function* rootSaga() {
  yield fork(administration);
  yield fork(app);
  yield fork(ethereum);
  yield fork(fund);
  yield fork(holdings);
  yield fork(openOrders);
  yield fork(orderbook);
  yield fork(participation);
  yield fork(ranking);
  yield fork(recentTrades);
  yield fork(setup);
  yield fork(trade);
  yield fork(tradeHistory);
  yield fork(wallet);

  if (global.analytics) yield fork(tracker);
}

export default rootSaga;
