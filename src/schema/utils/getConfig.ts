import * as Rx from 'rxjs';
import { timeout, retryWhen, delay } from 'rxjs/operators';
import { getConfig } from '@melonproject/melon.js';

const getConfigObservable = environment => {
  const config = getConfig(environment);
  return Rx.from(config).pipe(
    timeout(10000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

export default getConfigObservable;
