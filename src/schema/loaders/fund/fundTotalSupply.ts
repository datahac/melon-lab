import * as R from 'ramda';
import { getInfo } from '@melonproject/protocol';
import { getToken } from '@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken';
import { createQuantity } from '@melonproject/token-math/quantity';

async function getTotalSupply(environment, address) {
  const info = await getInfo(environment, address);
  const token = await getToken(environment, address);
  return createQuantity(token, info.totalSupply);
}

export default R.curryN(2, getTotalSupply);
