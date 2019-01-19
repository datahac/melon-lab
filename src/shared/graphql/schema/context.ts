import { publishReplay } from 'rxjs/operators';
import createLoaders from './loaders';
import subscribeBlock from './utils/subscribeBlock';
import currentRanking from './utils/currentRanking';
import subscribeSyncing from './utils/subscribeSyncing';
import hasRecentPrice from './utils/hasRecentPrice';
import currentPeers from './utils/currentPeers';

export async function createContext(environment, wallet = null) {
  // The current wallet (in an electron context);
  let currentWallet = wallet;

  const block$ = subscribeBlock(environment).pipe(publishReplay(1));
  const syncing$ = subscribeSyncing(environment).pipe(publishReplay(1));
  const peers$ = currentPeers(environment, block$).pipe(publishReplay(1));
  const ranking$ = currentRanking(environment, block$).pipe(publishReplay(1));
  const recentPrice$ = hasRecentPrice(environment, block$).pipe(
    publishReplay(1),
  );

  const streams = {
    peers$,
    block$,
    ranking$,
    syncing$,
    recentPrice$,
  };

  Object.values(streams).forEach(stream$ => stream$.connect());

  return () => ({
    environment,
    streams,
    loaders: {
      setWallet: value => {
        currentWallet = value;
      },
      getWallet: () => {
        return currentWallet;
      },
      ...createLoaders(environment, streams),
    },
  });
}
