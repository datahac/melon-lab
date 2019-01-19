import * as Rx from 'rxjs';

const subscribeSyncing = environment => {
  const current = environment.eth.isSyncing();
  const subscription = environment.eth.subscribe('syncing');
  return Rx.concat(Rx.from(current), Rx.fromEvent(subscription, 'data'));
};

export default subscribeSyncing;
