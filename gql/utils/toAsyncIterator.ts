import { $$asyncIterator } from 'iterall';
import * as Rx from 'rxjs';

function toAsyncIterator(observable$: Rx.Observable<any>) {
  const promiseCapability = () => {
    const x = {};

    x.promise = new Promise((a, b) => {
      x.resolve = a;
      x.reject = b;
    });

    return x;
  };

  let subscription;
  let promise;

  return {
    next() {
      if (typeof promise === 'undefined') {
        promise = promiseCapability();
      }

      if (typeof subscription === 'undefined') {
        subscription = observable$.subscribe(
          value => {
            promise.resolve({ value, done: false });
            promise = promiseCapability();
          },
          error => {
            promise.reject(error);
          },
          () => {
            promise.resolve({ value: undefined, done: true });
          },
        );
      }

      return promise.promise;
    },
    return() {
      subscription && subscription.unsubscribe();
      return Promise.resolve({ value: undefined, done: true });
    },
    throw(error) {
      subscription && subscription.unsubscribe();
      return Promise.reject(error);
    },
    [$$asyncIterator]() {
      return this;
    },
  };
}

export default toAsyncIterator;
