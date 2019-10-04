import * as R from 'ramda';
import { getHub } from '@melonproject/protocol';

function fundHub(environment, fundAddress) {
  return getHub(environment, fundAddress);
}

export default R.curryN(2, fundHub);
