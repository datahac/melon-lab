import * as R from 'ramda';
import { getSettings } from '@melonproject/protocol';

function fundSettings(environment, address) {
  return environment && getSettings(address, environment);
}

export default R.curryN(2, fundSettings);
