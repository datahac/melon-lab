import * as R from 'ramda';
import { getManagementFee } from '@melonproject/protocol';

function fundManagementFee(environment, feeManagerAddress) {
  return getManagementFee(environment, feeManagerAddress);
}

export default R.curryN(2, fundManagementFee);
