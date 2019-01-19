import * as R from 'ramda';
import { getNativeToken } from '@melonproject/protocol/lib/contracts/fund/accounting/calls/getNativeToken';

function fundNativeAsset(environment, address) {
  return getNativeToken(environment, address);
}

export default R.curryN(2, fundNativeAsset);
