import * as Rx from 'rxjs';
import { timeout, concatMap, expand, retryWhen, delay } from 'rxjs/operators';

const requestPeers = environment => {
  const peers = environment.api.net.peerCount();
  return Rx.from(peers).pipe(
    timeout(10000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const pollPeers = environment => {
  return requestPeers(environment).pipe(
    expand(() =>
      Rx.timer(5000).pipe(concatMap(() => requestPeers(environment))),
    ),
  );
};

export default pollPeers;
