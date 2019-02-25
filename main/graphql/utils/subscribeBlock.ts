import * as Rx from 'rxjs';
import { switchMap } from 'rxjs/operators';

const subscribeBlock = environment$ => {
  return environment$.pipe(
    switchMap(env => {
      const current = env.eth.getBlock('latest');
      const subscription = env.eth.subscribe('newBlockHeaders');
      return Rx.concat(Rx.from(current), Rx.fromEvent(subscription, 'data'));
    }),
  );
};

export default subscribeBlock;
