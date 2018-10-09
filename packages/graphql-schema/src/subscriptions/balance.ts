import * as Rx from 'rxjs';
import * as R from 'ramda';
import nativeBalance from '../loaders/balance/nativeBalance';
import etherBalance from '../loaders/balance/etherBalance';
import melonBalance from '../loaders/balance/melonBalance';
import withUnsubscribe from '../utils/withUnsubscribe';

export default {
  resolve: balance => {
    return balance;
  },
  subscribe: async (_, { address, token }, { pubsub, streams }) => {
    const getBalance = async (environment) => {
      switch (token) {
        case 'WETH':
          return nativeBalance(environment, address);
        case 'ETH':
          return etherBalance(environment, address);
        case 'MLN':
          return melonBalance(environment, address);
      }

      return null;
    };

    const balance$ = Rx.Observable.combineLatest(streams.environment$, streams.block$, (environment) => environment)
      .debounceTime(5000)
      .switchMap((environment) => Rx.Observable.fromPromise(getBalance(environment)))
      .distinctUntilChanged(R.equals);

    const channel = `balance:${address}:${token}`;
    const iterator = pubsub.asyncIterator(channel);
    const publish = value => pubsub.publish(channel, value);
    return withUnsubscribe(balance$, iterator, publish);
  },
};
