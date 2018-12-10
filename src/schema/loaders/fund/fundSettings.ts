import * as R from 'ramda';
import { getSettings } from '@melonproject/protocol';

function fundSettings(environment, address) {
  return getSettings(environment, address);
}

export default R.curryN(2, fundSettings);
