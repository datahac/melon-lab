import * as R from 'ramda';
import {
  valueIn,
  subtract,
  createQuantity,
  greaterThan,
} from '@melonproject/token-math';

function fundRemainingInvestAmount(daiPrice, investmentAssetPrice, fundGav) {
  const max = parseInt(process.env.MAX_INVEST_AMOUNT || '10000', 10);
  if (max === -1) {
    return null;
  }

  const maxCap = createQuantity(daiPrice.base.token, max);
  const maxCapInWeth = valueIn(daiPrice, maxCap);
  if (greaterThan(maxCapInWeth, fundGav)) {
    const remaining = subtract(maxCapInWeth, fundGav);
    return valueIn(investmentAssetPrice, remaining);
  }

  return createQuantity(investmentAssetPrice.base.token, 0);
}

export default R.curryN(3, fundRemainingInvestAmount);
