import * as Rx from 'rxjs';
import { hasRecentPrice } from '@melonproject/melon.js';

const requestPriceFeed = environment => {
  if (!environment) {
    return Rx.Observable.of(null);
  }

  const recentPrice = hasRecentPrice(environment);
  return Rx.Observable.fromPromise(recentPrice)
    .timeout(1000)
    .catch(error => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

const pollPriceFeed = environment => {
  return requestPriceFeed(environment).expand(() =>
    Rx.Observable.timer(5000).concatMap(() => requestPriceFeed(environment)),
  );
};

export default pollPriceFeed;
