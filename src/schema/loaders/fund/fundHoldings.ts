import * as R from 'ramda';
import { createQuantity } from '@melonproject/token-math/quantity';
import {
  getFundHoldings,
  isEmptyAddress,
  isAddress,
} from '@melonproject/protocol';
import { getTokenByAddress } from '@melonproject/protocol/lib/utils/environment/getTokenByAddress';

async function fundHoldings(environment, address) {
  const { 0: quantities, 1: tokens } = await getFundHoldings(
    environment,
    address,
  );

  return tokens
    .filter(value => {
      return isAddress(value) && !isEmptyAddress(value);
    })
    .map((value, key) => {
      const token = getTokenByAddress(environment, value);
      return createQuantity(token, quantities[key]);
    });
}

export default R.curryN(2, fundHoldings);
