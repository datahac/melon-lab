import * as R from 'ramda';
import { performCalculations } from '@melonproject/protocol/lib/contracts/fund/accounting/calls/performCalculations';

function fundCalculations(environment, address) {
  return performCalculations(environment, address);
}

export default R.curryN(2, fundCalculations);
