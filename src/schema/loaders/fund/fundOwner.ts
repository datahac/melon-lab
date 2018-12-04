import * as R from 'ramda';
import { getManager } from '@melonproject/protocol';

function fundOwner(environment, address) {
  return environment && getManager(address, environment);
}

export default R.curryN(2, fundOwner);
