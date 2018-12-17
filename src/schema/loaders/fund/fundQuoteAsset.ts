import * as R from 'ramda';
import { getQuoteToken } from '@melonproject/protocol/lib/contracts/fund/accounting/calls/getQuoteToken';

function fundQuoteAsset(environment, address) {
  return getQuoteToken(environment, address);
}

export default R.curryN(2, fundQuoteAsset);
