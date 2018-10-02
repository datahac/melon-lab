import * as Rx from 'rxjs';
import { getRanking } from '@melonproject/melon.js';

const requestRanking = (environment) => {
  const ranking = getRanking(environment);

  return Rx.Observable.fromPromise(ranking)
    .timeout(1000)
    .catch((error) => {
      // TODO: Add logging.
      return Rx.Observable.of([]);
    })
    .last();
};

const pollRanking = (environment) => {
  return requestRanking(environment).expand(() => {
    return Rx.Observable
      .timer(60000)
      .concatMap(() => requestRanking(environment));
  }).share();
}

export default pollRanking;
