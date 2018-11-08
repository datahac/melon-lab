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

  let promise = promiseCapability();
  const subscription = observable$.subscribe(
    (value) => {
      promise.resolve({ value, done: false });
      promise = promiseCapability();
    },
    (error) => {
      promise.reject(error);
    },
    () => {
      promise.resolve({ value: undefined, done: true });
    },
  );

  return {
    next() {
      return promise.promise;
    },
    return() {
      subscription.unsubscribe();
      return Promise.resolve({ value: undefined, done: true });
    },
    throw(error) {
      subscription.unsubscribe();
      return Promise.reject(error);      
    },
    [$$asyncIterator]() {
      return this;
    },
  };
}

export default toAsyncIterator;
