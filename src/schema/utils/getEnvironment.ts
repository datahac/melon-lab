import * as Rx from 'rxjs';
import { map, retryWhen, delay } from 'rxjs/operators';
import { getParityProvider } from '@melonproject/melon.js';

const getEnvironment = (track, endpoint) => {
  const promise = getParityProvider(endpoint);
  return Rx.from(promise).pipe(
    map((provider) => {
      if (typeof provider === 'undefined' || !provider) {
        throw new Error('Could not determine parity provider.');
      }

      return {
        ...provider,
        track,
      };
    }),
    retryWhen((errors) => errors.pipe(delay(1000))),
  );
};

export default getEnvironment;
