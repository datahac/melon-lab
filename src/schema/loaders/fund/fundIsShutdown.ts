import * as R from 'ramda';
import { isShutDown } from '@melonproject/protocol/lib/contracts/fund/hub/calls/isShutDown';

function fundIsShutdown(environment, address) {
  return isShutDown(environment, address);
}

export default R.curryN(2, fundIsShutdown);
