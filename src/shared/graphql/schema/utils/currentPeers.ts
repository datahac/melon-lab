import {
  switchMap,
  throttleTime,
  distinctUntilKeyChanged,
} from 'rxjs/operators';

function currentPeers(environment, block$) {
  return block$.pipe(
    distinctUntilKeyChanged('number'),
    throttleTime(5000),
    switchMap(() =>
      environment.eth.net.getPeerCount().then(a => {
        return a;
      }),
    ),
  );
}

export default currentPeers;
