import * as R from 'ramda';
import { getPerformanceFee } from '@melonproject/protocol';

function fundPerformanceFee(environment, feeManagerAddress) {
  return getPerformanceFee(environment, feeManagerAddress);
}

export default R.curryN(2, fundPerformanceFee);
