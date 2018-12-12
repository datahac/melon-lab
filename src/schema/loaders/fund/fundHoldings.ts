import * as R from 'ramda';
import { getFundHoldings } from '@melonproject/protocol/lib/contracts/fund/accounting/calls/getFundHoldings';

function fundHoldings(environment, address) {
  return getFundHoldings(environment, address);
}

export default R.curryN(2, fundHoldings);
