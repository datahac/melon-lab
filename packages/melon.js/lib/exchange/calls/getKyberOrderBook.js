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
 * Builds an artificial kyber orderbook of specified depth and granularity
 */
const getKyberOrderBook = async (
  environment,
  { baseTokenSymbol, quoteTokenSymbol, granularity = 1, depth = 5 },
) => {
  const orderbook = {'bids':[], 'asks':[]};
  const config = await getConfig(environment);
  const nativeAssetSymbol = await getNativeAssetSymbol(environment);

  // To get the srcAmount to be equivalent to the worth of i native asset (Ether) for i = 1..depth
  let [nativeAssetToBaseTokenPrice,] = await getConversionRate(environment, { srcTokenSymbol: nativeAssetSymbol, destTokenSymbol: baseTokenSymbol, srcAmount: 1 });
  nativeAssetToBaseTokenPrice = toReadable(config, nativeAssetToBaseTokenPrice, nativeAssetSymbol);
  
  let [nativeAssetToQuoteTokenPrice,] = await getConversionRate(environment, { srcTokenSymbol: nativeAssetSymbol, destTokenSymbol: quoteTokenSymbol, srcAmount: 1 });
  nativeAssetToQuoteTokenPrice = toReadable(config, nativeAssetToQuoteTokenPrice, nativeAssetSymbol);

  for (let i = 1; i <= depth; i += granularity) {
    const [, bidRate] = await getConversionRate(environment, { srcTokenSymbol: baseTokenSymbol, destTokenSymbol: quoteTokenSymbol, srcAmount: nativeAssetToBaseTokenPrice.mul(i) });
    const [, quoteToBaseSlippageRate] = await getConversionRate(environment, { srcTokenSymbol: quoteTokenSymbol, destTokenSymbol: baseTokenSymbol, srcAmount: nativeAssetToQuoteTokenPrice.mul(i) });
    const askRate = new BigNumber(10 ** 36).div(quoteToBaseSlippageRate);
    orderbook.bids.push(bidRate);
    orderbook.asks.push(askRate);
  } 
  return orderbook;
};

export default getKyberOrderBook;
