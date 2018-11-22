import * as R from 'ramda';
import * as protocol from '@melonproject/protocol';

function fundAddressFromManager(environment, managerAddress, contractAddress) {
  return (
    environment &&
    protocol.factory.managersToHubs(
      contractAddress,
      managerAddress,
      environment,
    )
  );
}

export default R.curryN(2, fundAddressFromManager);
