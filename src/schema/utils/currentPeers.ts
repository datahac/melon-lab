import * as Rx from 'rxjs';
import {
  switchMap,
  throttleTime,
  distinctUntilKeyChanged,
} from 'rxjs/operators';

function currentPeers(environment, block$) {
  const current = environment.eth.net.getPeerCount();

  return Rx.concat(
    Rx.from(current),
    block$.pipe(
      distinctUntilKeyChanged('number'),
      throttleTime(5000),
      switchMap(() => environment.eth.net.getPeerCount()),
    ),
  );
}

export default currentPeers;
