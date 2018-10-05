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
  return requestBlock(environment).expand(() => Rx.Observable
    .timer(5000)
    .concatMap(() => requestBlock(environment))
  );
}

export default pollBlock;
