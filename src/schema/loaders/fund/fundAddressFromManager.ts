import * as R from 'ramda';
import { getFundForManager } from '@melonproject/melon.js';

function fundAddressFromManager(environment, address) {
  return (
    environment && getFundForManager(environment, { managerAddress: address })
  );
}

export default R.curryN(2, fundAddressFromManager);
