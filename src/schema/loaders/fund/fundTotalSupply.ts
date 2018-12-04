import * as R from 'ramda';
import { getInfo } from '@melonproject/protocol';

function getTotalSupply(environment, address) {
  return environment && getInfo(address, environment);
}

export default R.curryN(2, getTotalSupply);
