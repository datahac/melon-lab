import * as Rx from 'rxjs';
import {
  distinctUntilKeyChanged,
  distinctUntilChanged,
  pluck,
  throttleTime,
  startWith,
  timeout,
  retryWhen,
  delay,
  tap,
  concatMap,
  switchMap,
} from 'rxjs/operators';
import {
  getQuoteToken,
  hasRecentPrice as hasRecentPriceCall,
} from '@melonproject/protocol';

const requestHasRecentPrice = (environment, address, token) => {
  return Rx.from(hasRecentPriceCall(address, token, environment)).pipe(
    timeout(2000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const hasRecentPrice = (environment, deployment$, block$) => {
  const throttled$ = block$.pipe(
    distinctUntilKeyChanged('number'),
    startWith(null),
    throttleTime(5000),
  );

  const source$ = deployment$.pipe(
    pluck('priceSource'),
    distinctUntilChanged(),
    switchMap(async address => {
      const token = await getQuoteToken(address, environment);
      return [address, token];
    }),
  );

  // Emit the quote token for each new block (throttled) or when
  // the deployment config changes.
  const token$ = Rx.combineLatest(source$, throttled$, source => source);

  return token$.pipe(
    concatMap(([address, token]) =>
      requestHasRecentPrice(environment, address, token),
    ),
  );
};

export default hasRecentPrice;
