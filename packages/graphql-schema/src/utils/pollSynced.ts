import * as Rx from 'rxjs';

const requestSynced = environment => {
  if (!environment) {
    return Rx.Observable.of(null);
  }

  return Rx.Observable.fromPromise(environment.api.eth.syncing())
    .map(value => !value)
    .timeout(1000)
    .catch(error => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

const pollSynced = environment => {
  return requestSynced(environment).expand(() =>
    Rx.Observable.timer(5000).concatMap(() => requestSynced(environment)),
  );
};

export default pollSynced;
