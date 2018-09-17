// @flow
import BigNumber from 'bignumber.js';
import { range } from 'ramda';
import getOrder from './getOrder';
import getConversionRate from './getConversionRate';
import getKyberProxyContract from '../contracts/getKyberProxyContract';
import toReadable from '../../assets/utils/toReadable';
import getNativeAssetSymbol from '../../version/calls/getNativeAssetSymbol';
import getConfig from '../../version/calls/getConfig';
import { Order } from '../schemas/Order';

/**
 * Get `numberOfOrders` active orders for the `baseTokenSymbol`/
 * `quoteTokenSymbol` asset pair
 */
const getKyberOrderBook = async (
  environment,
  { baseTokenSymbol, quoteTokenSymbol, progression = 1, depth = 5 },
) => {
  const rates = []
  const config = await getConfig(environment);
  const nativeAssetSymbol = await getNativeAssetSymbol(environment);

  // To get the srcAmount to be equivalent to the worth of native asset (Ether) in incremental order
  let [nativeAssetToBaseTokenPrice,] = await getConversionRate(environment, { srcTokenSymbol: nativeAssetSymbol, destTokenSymbol: baseTokenSymbol, srcAmount: 1 });
  nativeAssetToBaseTokenPrice = toReadable(config, nativeAssetToBaseTokenPrice, nativeAssetSymbol);

  for (let i = 1; i <= depth; i++) {
    const [, slippageRate] = await getConversionRate(environment, { srcTokenSymbol: baseTokenSymbol, destTokenSymbol: quoteTokenSymbol, srcAmount: nativeAssetToBaseTokenPrice.mul(i) });
    rates.push(slippageRate);
  }
  return rates;
};

export default getKyberOrderBook;
