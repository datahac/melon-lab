import * as Rx from 'rxjs';
import {
  distinctUntilKeyChanged,
  throttleTime,
  timeout,
  retryWhen,
  delay,
  concatMap,
  withLatestFrom,
} from 'rxjs/operators';
import { getFundDetails } from '@melonproject/protocol';

const requestRanking = (environment, rankingAddress, versionAddress) => {
  return Rx.from(getFundDetails(environment, rankingAddress, versionAddress)).pipe(
    timeout(30 * 1000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const currentRanking = (environment$, block$) => {
  const throttled$ = block$.pipe(
    distinctUntilKeyChanged('number'),
    throttleTime(5000),
  );

  return throttled$.pipe(
    withLatestFrom(environment$),
    concatMap(([_, env]) => {
      return requestRanking(env, env.deployment.melonContracts.ranking, env.deployment.melonContracts.version);
    }),
  );
};

export default currentRanking;
