import * as Rx from 'rxjs';

const requestSynced = environment => {
  const syncing = environment.api.eth.syncing();

  return Rx.Observable.fromPromise(syncing)
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
