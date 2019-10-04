import * as R from 'ramda';
import { managersToHubs } from '@melonproject/protocol';

function fundAddressFromManager(environment, managerAddress) {
  return managersToHubs(environment, environment.deployment.melonContracts.version, managerAddress);
}

export default R.curryN(2, fundAddressFromManager);
