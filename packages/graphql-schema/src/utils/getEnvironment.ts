import * as Rx from 'rxjs';
import { getParityProvider } from '@melonproject/melon.js';

const getEnvironment = (track, endpoint) => {
  return Rx.Observable.fromPromise(getParityProvider(endpoint))
    .map((provider) => {
      if (!provider) {
        return null;
      }

      return {
        ...provider,
        track,
      };
    });
};

export default getEnvironment;
