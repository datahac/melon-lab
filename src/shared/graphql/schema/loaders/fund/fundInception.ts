import * as R from 'ramda';
import { getCreationTime } from '@melonproject/protocol/lib/contracts/fund/hub/calls/getCreationTime';

function fundInception(environment, address) {
  return getCreationTime(environment, address);
}

export default R.curryN(2, fundInception);
