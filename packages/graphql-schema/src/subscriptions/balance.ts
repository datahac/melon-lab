import * as Rx from 'rxjs';
import * as R from 'ramda';
import nativeBalance from '../loaders/balance/nativeBalance';
import etherBalance from '../loaders/balance/etherBalance';
import melonBalance from '../loaders/balance/melonBalance';
import toAsyncIterator from '../utils/toAsyncIterator';

export default {
  resolve: balance => {
    return balance;
  },
  subscribe: async (_, { address, token }, { pubsub, streams }) => {
    const getBalance = async (environment, config) => {
      switch (token) {
        case 'WETH':
          return nativeBalance(environment, config, address);
        case 'ETH':
          return etherBalance(environment, config, address);
        case 'MLN':
          return melonBalance(environment, config, address);
      }

      return null;
    };

    const balance$ = Rx.Observable.combineLatest(
      streams.environment$,
      streams.config$,
      streams.block$,
      (environment, config) => [environment, config],
    )
      .debounceTime(5000)
      .switchMap(([environment, config]) =>
        Rx.Observable.fromPromise(getBalance(environment, config)),
      )
      .distinctUntilChanged(R.equals);

    return toAsyncIterator(balance$);
  },
};
