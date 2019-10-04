import * as R from 'ramda';
import { getFundHoldings, balanceOf } from '@melonproject/protocol';
import { isZero, createQuantity } from '@melonproject/token-math';
import isSameAddress from '../../utils/isSameAddress';

async function fundHoldings(environment, accountingAddress, tradingAddress) {
  const holdings = await getFundHoldings(environment, accountingAddress);
  const locked = await Promise.all(
    holdings.map(async holding => {
      if (isZero(holding)) {
        return holding;
      }

      return balanceOf(environment, holding.token.address, {
        address: tradingAddress,
      });
    }),
  );

  const available = R.pathOr([], ['deployment', 'thirdPartyContracts', 'tokens'], environment).map(value =>
    createQuantity(value, 0),
  );

  const all = available.reduce((carry, current) => {
    const holdingQty =
      holdings.find(item => {
        return isSameAddress(item.token.address, current.token.address);
      }) || current;
    const lockedQty =
      locked.find(item => {
        return isSameAddress(item.token.address, current.token.address);
      }) || current;

    return [
      ...carry,
      {
        balance: holdingQty,
        locked: lockedQty,
      },
    ];
  }, []);

  return all;
}

export default R.curryN(3, fundHoldings);
