import * as R from 'ramda';
import { getName } from '@melonproject/protocol';

function fundName(environment, address) {
  return environment && getName(address, environment);
}

export default R.curryN(2, fundName);
