import * as Rx from 'rxjs';
import { getParityProvider } from '@melonproject/melon.js';

const getEnvironment = (track, endpoint) => {
  return Rx.Observable.defer(async () => ({
    ...(await getParityProvider(endpoint)),
    track,
  }));
};

export default getEnvironment;
