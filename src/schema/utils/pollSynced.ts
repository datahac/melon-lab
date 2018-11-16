import * as Rx from 'rxjs';
import {
  map,
  delay,
  timeout,
  retryWhen,
  concatMap,
  expand,
} from 'rxjs/operators';

const requestSynced = environment => {
  const syncing = environment.api.eth.syncing();
  return Rx.from(syncing).pipe(
    map(value => !value),
    timeout(10000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const pollSynced = environment => {
  return requestSynced(environment).pipe(
    expand(() =>
      Rx.timer(5000).pipe(concatMap(() => requestSynced(environment))),
    ),
  );
};

export default pollSynced;
