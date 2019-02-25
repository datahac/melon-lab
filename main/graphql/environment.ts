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
  publishReplay,
  tap,
  shareReplay,
  retry,
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

export const getEnvironment = async (logger?: CurriedLogger) => {
  const [primary, ...fallbacks] = (process.env.ENDPOINT as string).split(',');

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

  const withFallback = fallback =>
    catchError(() => {
      return Rx.from(createEnvironment(fallback, logger));
    });

  const makeEnvironment = () =>
    fallbacks.reduce(
      (carry, current) =>
        carry.pipe(
          withRetry(3, 250),
          withFallback(current),
        ),
      Rx.defer(() => createEnvironment(primary, logger)),
    );

  return makeEnvironment().pipe(
    withRetry(3, 1000),
    catchError(() => Rx.from(makeEnvironment())),
    shareReplay(1),
  );
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
