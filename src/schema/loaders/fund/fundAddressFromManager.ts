import * as R from 'ramda';
import { managersToHubs } from '@melonproject/protocol';

function fundAddressFromManager(environment, managerAddress, contractAddress) {
  return (
    environment && managersToHubs(contractAddress, managerAddress, environment)
  );
}

export default R.curryN(2, fundAddressFromManager);
