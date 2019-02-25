import * as Rx from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

const subscribeSyncing = environment$ => {
  return Rx.concat(
    environment$.pipe(
      take(1),
      switchMap(env => {
        const current = env.eth.isSyncing();
        return Rx.from(current);
      }),
    ),
    environment$.pipe(
      switchMap(env => {
        const subscription = env.eth.subscribe('syncing');
        return Rx.fromEvent(subscription, 'data');
      }),
    ),
  );
};

export default subscribeSyncing;
