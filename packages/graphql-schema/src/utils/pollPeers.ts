import * as Rx from 'rxjs';

const requestPeers = environment => {
  const peers = environment.api.net.peerCount();
  return Rx.Observable.fromPromise(peers)
    .timeout(10000)
    .retryWhen((errors) => errors.delay(1000));
};

const pollPeers = environment => {
  return requestPeers(environment).expand(() =>
    Rx.Observable.timer(5000).concatMap(() => requestPeers(environment)),
  );
};

export default pollPeers;
