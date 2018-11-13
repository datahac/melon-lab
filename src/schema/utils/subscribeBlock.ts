import * as Rx from 'rxjs';

const subscribeBlock = environment => {
  const current = environment.eth.getBlock('latest');
  const subscription = environment.eth.subscribe('newBlockHeaders');
  return Rx.concat(Rx.from(current), Rx.fromEvent(subscription, 'data'));
};

export default subscribeBlock;
