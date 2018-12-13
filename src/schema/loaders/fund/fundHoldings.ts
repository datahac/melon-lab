import * as R from 'ramda';
import { getFundHoldings } from '@melonproject/protocol';

function fundHoldings(environment, address) {
  return getFundHoldings(environment, address);
}

export default R.curryN(2, fundHoldings);
