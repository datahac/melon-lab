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

  const availableTokens = R.pathOr(
    [],
    ['deployment', 'thirdPartyContracts', 'tokens'],
    environment,
  ).map(value => {
    return {
      quantity: 0,
      token: value,
    };
  });

  const holdings = tokens
    .filter(value => {
      return isAddress(value) && !isEmptyAddress(value);
    })
    .map((value, key) => {
      const token = getTokenByAddress(environment, value);
      return createQuantity(token, quantities[key]);
    });

  return R.unionWith(R.eqBy(R.prop('token')), holdings, availableTokens);
}

export default R.curryN(2, fundHoldings);
