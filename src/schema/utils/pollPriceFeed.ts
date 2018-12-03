import * as Rx from 'rxjs';
// import { timeout, retryWhen, delay, expand, concatMap } from 'rxjs/operators';

// const requestPriceFeed = environment => {
//   return Rx.from(recentPrice).pipe(
//     timeout(10000),
//     retryWhen(errors => errors.pipe(delay(1000))),
//   );
// };

// const pollPriceFeed = environment => {
//   const doPoll = () =>
//     Rx.timer(5000).pipe(concatMap(() => requestPriceFeed(environment)));

//   return requestPriceFeed(environment).pipe(expand(doPoll));
// };

// TODO: Implement this properly.
const pollPriceFeed = () => {
  return Rx.of(false);
};

export default pollPriceFeed;
