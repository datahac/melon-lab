import * as Rx from 'rxjs';

const requestPeers = environment => {
  if (!environment) {
    return Rx.Observable.of(null);
  }

  return Rx.Observable.fromPromise(environment.api.net.peerCount())
    .timeout(10000)
    .catch(error => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

const pollPeers = environment => {
  return requestPeers(environment).expand(() =>
    Rx.Observable.timer(20000).concatMap(() => requestPeers(environment)),
  );
};

export default pollPeers;
