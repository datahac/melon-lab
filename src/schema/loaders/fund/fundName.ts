import * as R from 'ramda';
import { getName } from '@melonproject/protocol';

function fundName(environment, address) {
  return getName(environment, address);
}

export default R.curryN(2, fundName);
