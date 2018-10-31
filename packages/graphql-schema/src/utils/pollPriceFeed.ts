import * as Rx from 'rxjs';
import { hasRecentPrice } from '@melonproject/melon.js';

const requestPriceFeed = environment => {
  const recentPrice = hasRecentPrice(environment);
  return Rx.Observable.fromPromise(recentPrice)
    .timeout(10000)
    .retryWhen((errors) => errors.delay(1000));
};

const pollPriceFeed = environment => {
  return requestPriceFeed(environment).expand(() =>
    Rx.Observable.timer(5000).concatMap(() => requestPriceFeed(environment)),
  );
};

export default pollPriceFeed;
