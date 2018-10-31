import * as Rx from 'rxjs';
import { getParityProvider } from '@melonproject/melon.js';

const getEnvironment = (track, endpoint) => {
  const promise = getParityProvider(endpoint);
  return Rx.Observable.fromPromise(promise)
    .map((provider) => {
      if (typeof provider === 'undefined' || !provider) {
        throw new Error('Could not determine parity provider.');
      }

      return {
        ...provider,
        track,
      };
    })
    .retryWhen((errors) => errors.delay(1000));
};

export default getEnvironment;
