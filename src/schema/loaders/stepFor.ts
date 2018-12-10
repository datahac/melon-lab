import * as R from 'ramda';
import { getStepFor } from '@melonproject/protocol/lib/contracts/factory/calls/getStepFor';

function stepFor(environment, managerAddress) {
  return getStepFor(environment, managerAddress);
}

export default R.curryN(2, stepFor);
