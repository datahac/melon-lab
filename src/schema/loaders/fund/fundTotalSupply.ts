import * as R from 'ramda';
import { getInfo } from '@melonproject/protocol';

function getTotalSupply(environment, address) {
  return getInfo(environment, address);
}

export default R.curryN(2, getTotalSupply);
