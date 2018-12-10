import * as R from 'ramda';
import { getManager } from '@melonproject/protocol';

function fundOwner(environment, address) {
  return getManager(environment, address);
}

export default R.curryN(2, fundOwner);
