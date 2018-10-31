import * as Rx from 'rxjs';
import { getConfig } from '@melonproject/melon.js';

const getConfigObservable = environment => {
  if (!environment) {
    return Rx.Observable.of(null);
  }

  const config = getConfig(environment);
  return Rx.Observable.fromPromise(config)
    .timeout(1000)
    .catch(error => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

export default getConfigObservable;
