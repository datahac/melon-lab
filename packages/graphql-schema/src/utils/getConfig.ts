import * as Rx from 'rxjs';
import { getConfig } from '@melonproject/melon.js';

const getConfigObservable = environment => {
  const config = getConfig(environment);
  return Rx.Observable.fromPromise(config)
    .timeout(10000)
    .retryWhen((errors) => errors.delay(1000));
};

export default getConfigObservable;
