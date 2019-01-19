import * as R from 'ramda';
import { isShutDown } from '@melonproject/protocol';

function getIsshutDown(environment, managerAddress) {
  return isShutDown(environment, managerAddress);
}

export default R.curryN(2, getIsshutDown);
