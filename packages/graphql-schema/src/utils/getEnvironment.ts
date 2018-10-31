import * as Rx from 'rxjs';
import { getParityProvider } from '@melonproject/melon.js';

const providerOrNull = (track) => (provider) => {
  if (!provider) {
    return null;
  }

  return {
    ...provider,
    track,
  };
};

const getEnvironment = (track, endpoint) => {
  const provider = getParityProvider(endpoint);
  return Rx.Observable.fromPromise(provider)
    .map(providerOrNull(track))
    .timeout(10000)
    .catch(error => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

export default getEnvironment;
