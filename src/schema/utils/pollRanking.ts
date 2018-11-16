import * as Rx from 'rxjs';
import { timeout, catchError, last, concatMap, expand } from 'rxjs/operators';
import { getRanking } from '@melonproject/melon.js';

const requestRanking = environment => {
  const ranking = getRanking(environment);
  return Rx.from(ranking).pipe(
    timeout(10000),
    catchError(error => {
      // TODO: Add logging.
      return Rx.of(null);
    }),
    last(),
  );
};

const pollRanking = environment => {
  return requestRanking(environment).pipe(
    expand(() =>
      Rx.timer(60000).pipe(concatMap(() => requestRanking(environment))),
    ),
  );
};

export default pollRanking;
