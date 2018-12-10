import * as Rx from 'rxjs';
import {
  distinctUntilKeyChanged,
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
    getFundDetails(environment, rankingAddress, versionAddress),
  ).pipe(
    timeout(3000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const currentRanking = (environment, block$) => {
  const throttled$ = block$.pipe(
    distinctUntilKeyChanged('number'),
    startWith(null),
    throttleTime(5000),
  );

  return throttled$.pipe(
    concatMap(() => {
      return requestRanking(
        environment,
        environment.deployment.ranking,
        environment.deployment.version,
      );
    }),
  );
};

export default currentRanking;
