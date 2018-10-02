import * as Rx from 'rxjs';

const requestBlock = (environment) => {
  const blockNumber = environment.api.eth.blockNumber();

  return Rx.Observable.fromPromise(blockNumber)
    .timeout(1000)
    .catch((error) => {
      // TODO: Add logging.
      return Rx.Observable.of(null);
    })
    .last();
};

const pollBlock = (environment) => {
  return requestBlock(environment).expand(() => {
    return Rx.Observable
      .timer(1000)
      .concatMap(() => requestBlock(environment));
  }).distinctUntilChanged((a, b) => {
    if (a !== b) {
      return a && b && a.toString() === b.toString();
    }

    return false;
  }).share();
}

export default pollBlock;
