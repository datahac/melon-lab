import * as Rx from 'rxjs';

const requestPeers = (environment) => {
  const peers = environment.api.net.peerCount();

  return Rx.Observable.fromPromise(peers)
    .timeout(1000)
    .catch((error) => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

const pollPeers = (environment) => {
  return requestPeers(environment).expand(() => Rx.Observable
    .timer(5000)
    .concatMap(() => requestPeers(environment))
  );
}

export default pollPeers;