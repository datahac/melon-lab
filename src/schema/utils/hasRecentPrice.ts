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
import {
  getQuoteToken,
  hasRecentPrice as hasRecentPriceCall,
} from '@melonproject/protocol';

const requestHasRecentPrice = environment => {
  return Rx.defer(async () => {
    const address = environment.deployment.melonContracts.priceSource;
    const token = await getQuoteToken(environment, address);
    return hasRecentPriceCall(environment, address, token);
  }).pipe(
    timeout(2000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const hasRecentPrice = (environment, block$) => {
  const throttled$ = block$.pipe(
    distinctUntilKeyChanged('number'),
    startWith(null),
    throttleTime(5000),
  );

  return throttled$.pipe(concatMap(() => requestHasRecentPrice(environment)));
};

export default hasRecentPrice;
