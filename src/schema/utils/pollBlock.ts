import * as Rx from 'rxjs';
import { timeout, retryWhen, concatMap, expand, delay } from 'rxjs/operators';

const requestBlock = environment => {
  const block = environment.api.eth.blockNumber();
  return Rx.from(block).pipe(
    timeout(10000),
    retryWhen(errors => errors.pipe(delay(1000))),
  );
};

const pollBlock = environment => {
  return requestBlock(environment).pipe(
    expand(() =>
      Rx.timer(5000).pipe(concatMap(() => requestBlock(environment))),
    ),
  );
};

export default pollBlock;
