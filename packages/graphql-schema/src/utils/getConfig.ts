import * as Rx from 'rxjs';
import { getConfig } from '@melonproject/melon.js';

const getConfigObservable = environment => {
  return Rx.Observable.fromPromise(getConfig(environment));
};

export default getConfigObservable;
