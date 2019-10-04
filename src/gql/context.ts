import * as Rx from 'rxjs';
import { publishReplay } from 'rxjs/operators';
import createLoaders from './loaders';
import subscribeBlock from './utils/subscribeBlock';
import currentRanking from './utils/currentRanking';
import hasRecentPrice from './utils/hasRecentPrice';
import currentPeers from './utils/currentPeers';

export enum WalletTypes {
  KEYTAR = 'KEYTAR',
  HARDWARE = 'HARDWARE',
  INJECTED = 'INJECTED',
}

export function createContext(environment, wallet = null) {
  // The current wallet (in an electron context);
  let currentWallet = wallet;
  let walletType: WalletTypes | undefined = !!wallet ? WalletTypes.INJECTED : undefined;

  const environment$ = Rx.from(environment).pipe(publishReplay(1));
  const block$ = subscribeBlock(environment$).pipe(publishReplay(1));
  const peers$ = currentPeers(environment$, block$).pipe(publishReplay(1));
  const ranking$ = currentRanking(environment$, block$).pipe(publishReplay(1));
  const recentPrice$ = hasRecentPrice(environment$, block$).pipe(publishReplay(1));

  const streams = {
    peers$,
    block$,
    ranking$,
    recentPrice$,
    environment$,
  };

  Object.values(streams).forEach(stream$ => stream$.connect());

  return () => {
    const loaders = createLoaders(environment$, streams);

    return {
      streams,
      loaders: {
        setWallet: (value, type: WalletTypes = WalletTypes.KEYTAR) => {
          currentWallet = value;
          walletType = type;
        },
        getWallet: () => {
          return currentWallet;
        },
        getWalletType: () => {
          return walletType;
        },
        ...loaders,
      },
    };
  };
}
