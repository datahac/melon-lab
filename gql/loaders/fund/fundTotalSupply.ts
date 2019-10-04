import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { getInfo } from '@melonproject/protocol';
import { getToken } from '@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken';

async function getTotalSupply(environment, address) {
  const info = await getInfo(environment, address);
  const token = await getToken(environment, address);
  return Tm.createQuantity(token, info.totalSupply);
}

export default R.curryN(2, getTotalSupply);
