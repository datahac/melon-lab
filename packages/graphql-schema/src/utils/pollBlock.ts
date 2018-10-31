import * as Rx from 'rxjs';

const requestBlock = environment => {
  if (!environment) {
    return Rx.Observable.of(null);
  }

  return Rx.Observable.fromPromise(environment.api.eth.blockNumber())
    .timeout(10000)
    .catch(error => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

const pollBlock = environment => {
  return requestBlock(environment).expand(() =>
    Rx.Observable.timer(20000).concatMap(() => requestBlock(environment)),
  );
};

export default pollBlock;
