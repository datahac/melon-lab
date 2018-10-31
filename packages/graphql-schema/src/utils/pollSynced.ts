import * as Rx from 'rxjs';

const requestSynced = environment => {
  return Rx.Observable.fromPromise(environment.api.eth.syncing())
    .map(value => !value)
    .timeout(10000)
    .retryWhen((errors) => errors.delay(1000));
};

const pollSynced = environment => {
  return requestSynced(environment).expand(() =>
    Rx.Observable.timer(5000).concatMap(() => requestSynced(environment)),
  );
};

export default pollSynced;
