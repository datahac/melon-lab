import * as R from 'ramda';
import { getHoldingsAndPrices } from '@melonproject/melon.js';

async function fundHoldings(environment, contract) {
  const address = contract.instance.address;
  const holdings =
    (environment &&
      (await getHoldingsAndPrices(environment, {
        fundAddress: address,
      }))) ||
    [];

  return holdings.map(holding => ({
    ...holding,
    fund: address,
  }));
}

export default R.curryN(2, fundHoldings);
