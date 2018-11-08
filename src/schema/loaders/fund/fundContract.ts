import * as R from 'ramda';
import { getFundContract } from '@melonproject/melon.js';

function fundContract(environment, address) {
  return environment && getFundContract(environment, address);
}

export default R.curryN(2, fundContract);
