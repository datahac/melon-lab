import {
  switchMap,
  throttleTime,
  distinctUntilKeyChanged,
  withLatestFrom,
} from 'rxjs/operators';

function currentPeers(environment$, block$) {
  return block$.pipe(
    distinctUntilKeyChanged('number'),
    throttleTime(5000),
    withLatestFrom(environment$),
    switchMap(([_, environment]) =>
      environment.eth.net.getPeerCount().then(a => {
        return a;
      }),
    ),
  );
}

export default currentPeers;
