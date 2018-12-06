import * as R from 'ramda';
import * as Rx from 'rxjs';
import {
  distinctUntilKeyChanged,
  tap,
  throttleTime,
  startWith,
  timeout,
  retryWhen,
  delay,
  concatMap,
} from 'rxjs/operators';
import { getFundDetails } from '@melonproject/protocol';

const requestRanking = (environment, rankingAddress, versionAddress) => {
  return Rx.from(
    getFundDetails(rankingAddress, versionAddress, environment),
  ).pipe(
    timeout(60000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const currentRanking = (environment, deployment$, block$) => {
  const throttled$ = block$.pipe(
    distinctUntilKeyChanged('number'),
    startWith(null),
    throttleTime(60000),
  );

  // Emit the deployment version for each new block (throttled) or when
  // the deployment config changes.
  const version$ = Rx.combineLatest(deployment$, throttled$, deployment => {
    return [deployment.ranking, deployment.version];
  });

  return version$.pipe(
    concatMap(([rankingAddress, versionAddress]) => {
      return requestRanking(environment, rankingAddress, versionAddress);
    }),
  );
};

export default currentRanking;
