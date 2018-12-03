import * as Rx from 'rxjs';
import { timeout, retryWhen, delay, concatMap, expand } from 'rxjs/operators';

const requestRanking = environment => {
  // TODO: Implement this properly.
  const ranking = [];
  return Rx.from(ranking).pipe(
    timeout(10000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const pollRanking = environment => {
  const doPoll = () =>
    Rx.timer(60000).pipe(concatMap(() => requestRanking(environment)));

  return requestRanking(environment).pipe(expand(doPoll));
};

export default pollRanking;
