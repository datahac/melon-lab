import { constructEnvironment } from '@melonproject/protocol';
import { withDeployment } from '@melonproject/protocol/lib/utils/environment/withDeployment';
import {
  Tracks,
  CurriedLogger,
} from '@melonproject/protocol/lib/utils/environment/Environment';
import * as Rx from 'rxjs';
import Wallet from 'ethers-wallet';
import {
  retryWhen,
  catchError,
  scan,
  delay,
  shareReplay,
  withLatestFrom,
  switchMap,
  distinctUntilChanged,
  skipUntil,
  map,
  tap,
  retry,
  publishReplay,
} from 'rxjs/operators';

const createEnvironment = async (endpoint: string, logger?: CurriedLogger) => {
  const environment = constructEnvironment({
    logger,
    endpoint,
    track: process.env.TRACK as Tracks,
  });

  await environment.eth.net.getId();
  return withDeployment(environment);
};

const withRetry = (times, interval) =>
  retryWhen(errors =>
    errors.pipe(
      scan((count, error) => {
        if (count >= times) {
          throw error;
        }

        return count + 1;
      }, 0),
      delay(interval),
    ),
  );

const withFallback = (fallback, logger?: CurriedLogger) =>
  catchError(() => Rx.defer(() => createEnvironment(fallback, logger)));

export const getEnvironment = async (logger?: CurriedLogger) => {
  const [primary, ...fallbacks] = (process.env.ENDPOINT as string).split(',');

  const makeEnvironment = () =>
    fallbacks
      .reduce((carry, current) => {
        return carry.pipe(
          withFallback(current),
          withRetry(3, 250),
        );
      }, Rx.defer(() => createEnvironment(primary, logger)))
      .pipe(withRetry(3, 250));

  const environment$ = makeEnvironment();
  const stream$ = environment$.pipe(
    switchMap(environment =>
      Rx.interval(250).pipe(
        switchMap(() => environment.eth.net.getId()),
        scan((carry, current) => {
          if (carry && carry !== current) {
            throw new Error('Network change detected.');
          }

          return current;
        }),
        distinctUntilChanged(),
        map(() => environment),
      ),
    ),
    retry(),
    publishReplay(1),
  );

  return stream$;
};

export const getWallet = async () => {
  // Automatically log in to a wallet. Useful for development.
  const development = ['development', 'test'].includes(process.env
    .NODE_ENV as string);

  if (process.env.MNEMONIC && development) {
    return Wallet.Wallet.fromMnemonic(process.env.MNEMONIC);
  }

  if (process.env.PRIVATE_KEY && development) {
    return new Wallet.Wallet(process.env.PRIVATE_KEY);
  }

  return null;
};
