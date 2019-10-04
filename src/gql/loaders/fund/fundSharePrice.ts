import * as R from 'ramda';
import { getShareCostInAsset, getTokenBySymbol, getToken } from '@melonproject/protocol';

async function fundSharePrice(environment, sharesAddress, accountingAddress, symbol) {
  const assetToken = getTokenBySymbol(environment, symbol);
  const fundToken = await getToken(environment, sharesAddress);

  return getShareCostInAsset(environment, accountingAddress, {
    assetToken,
    fundToken,
  });
}

export default R.curryN(4, fundSharePrice);
