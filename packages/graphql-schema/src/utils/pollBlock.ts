import * as Rx from 'rxjs';

const requestBlock = environment => {
  const block = environment.api.eth.blockNumber();
  return Rx.Observable.fromPromise(block)
    .timeout(10000)
    .retryWhen((errors) => errors.delay(1000));
};

const pollBlock = environment => {
  return requestBlock(environment).expand(() =>
    Rx.Observable.timer(5000).concatMap(() => requestBlock(environment)),
  );
};

export default pollBlock;
