import * as R from 'ramda';
import { getHub } from '@melonproject/protocol';

function fundContract(environment, address) {
  return environment && getHub(address, environment);
}

export default R.curryN(2, fundContract);
