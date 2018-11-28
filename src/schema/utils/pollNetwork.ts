import * as Rx from 'rxjs';
import { timeout, retryWhen, concatMap, expand, delay } from 'rxjs/operators';

const requestNetwork = environment => {
  const promise = environment.eth.net.getId();
  return Rx.from(promise).pipe(
    timeout(10000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const pollNetwork = environment => {
  const doPoll = () =>
    Rx.timer(5000).pipe(concatMap(() => requestNetwork(environment)));

  return requestNetwork(environment).pipe(expand(doPoll));
};

export default pollNetwork;
