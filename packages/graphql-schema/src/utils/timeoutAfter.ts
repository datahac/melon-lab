import * as Rx from 'rxjs';

const timeoutAfter = (after, value) => {
  return Rx.Observable.never()
    .timeout(after)
    .catch(() => Rx.Observable.of(value));
};

export default timeoutAfter;
