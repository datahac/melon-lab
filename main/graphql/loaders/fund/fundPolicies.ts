import * as R from 'ramda';
import { getPolicyInformation } from '@melonproject/protocol';

function fundPolicies(environment, address) {
  return getPolicyInformation(environment, address);
}

export default R.curryN(2, fundPolicies);
