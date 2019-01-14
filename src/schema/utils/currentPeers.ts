import {
  switchMap,
  throttleTime,
  distinctUntilKeyChanged,
  startWith,
} from 'rxjs/operators';

function currentPeers(environment, block$) {
  return block$.pipe(
    distinctUntilKeyChanged('number'),
    throttleTime(5000),
    switchMap(() => environment.eth.net.getPeerCount()),
    startWith(environment.eth.net.getPeerCount()),
  );
}

export default currentPeers;
