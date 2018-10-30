import * as Rx from 'rxjs';
import { getConfig } from '@melonproject/melon.js';

const getConfigObservable = environment => {
  if (!environment) {
    return Rx.Observable.of(null);
  }

  return Rx.Observable.fromPromise(getConfig(environment));
};

export default getConfigObservable;
