// @flow
import BigNumber from 'bignumber.js';
import { range } from 'ramda';
import getOrder from './getOrder';
import getConversionRate from './getConversionRate';
import getKyberProxyContract from '../contracts/getKyberProxyContract';
import toReadable from '../../assets/utils/toReadable';
import getDecimals from '../../assets/utils/getDecimals';
import getNativeAssetSymbol from '../../version/calls/getNativeAssetSymbol';
import getConfig from '../../version/calls/getConfig';
import { Order } from '../schemas/Order';

const formatOrder = (
  config,
  type,
  sellSymbol,
  buySymbol,
  sellQuantity,
  price,
): Order => {
  const order = {
    id: -1,
    owner: 'Kyber',
    isActive: true,
    price,
    type,
    exchangeContractAddress: config.kyberNetworkAddress,
    exchange: 'Kyber',
  };

  order.sell = {
    symbol: sellSymbol,
    howMuch: sellQuantity,
  };

  const buyQuantity =
    type === 'sell' ? sellQuantity.mul(price) : sellQuantity.div(price);
  order.buy = {
    symbol: buySymbol,
    howMuch: buyQuantity,
  };

  return order;
};

/**
 * Builds an artificial kyber orderbook of specified depth and granularity
 */
const getKyberOrderbook = async (
  environment,
  { baseTokenSymbol, quoteTokenSymbol, granularity = 1, depth = 5 },
): [Order] => {
  const orderbook = [];
  const config = await getConfig(environment);
  const nativeAssetSymbol = await getNativeAssetSymbol(environment);

  // To get the srcAmount to be equivalent to the worth of i native asset (Ether) for i = 1..depth
  let [nativeAssetToBaseTokenPrice] = await getConversionRate(environment, {
    srcTokenSymbol: nativeAssetSymbol,
    destTokenSymbol: baseTokenSymbol,
    srcAmount: 1,
  });
  nativeAssetToBaseTokenPrice = toReadable(
    config,
    nativeAssetToBaseTokenPrice,
    nativeAssetSymbol,
  );

  let [nativeAssetToQuoteTokenPrice] = await getConversionRate(environment, {
    srcTokenSymbol: nativeAssetSymbol,
    destTokenSymbol: quoteTokenSymbol,
    srcAmount: 1,
  });
  nativeAssetToQuoteTokenPrice = toReadable(
    config,
    nativeAssetToQuoteTokenPrice,
    nativeAssetSymbol,
  );

  for (let i = 1; i <= depth; i += granularity) {
    // Calculate bidRate
    const bidVolume = nativeAssetToBaseTokenPrice.mul(i);
    const [, baseToQuoteSlippageRate] = await getConversionRate(environment, {
      srcTokenSymbol: baseTokenSymbol,
      destTokenSymbol: quoteTokenSymbol,
      srcAmount: bidVolume,
    });
    const bidRate = toReadable(
      config,
      baseToQuoteSlippageRate,
      nativeAssetSymbol,
    );

    // Calculate askRate
    const askVolume = nativeAssetToQuoteTokenPrice.mul(i);
    const [, quoteToBaseSlippageRate] = await getConversionRate(environment, {
      srcTokenSymbol: quoteTokenSymbol,
      destTokenSymbol: baseTokenSymbol,
      srcAmount: askVolume,
    });
    const askRate = new BigNumber(10 ** 18).div(quoteToBaseSlippageRate);

    orderbook.push(
      formatOrder(
        config,
        'sell',
        baseTokenSymbol,
        quoteTokenSymbol,
        bidVolume,
        bidRate,
      ),
    );
    orderbook.push(
      formatOrder(
        config,
        'buy',
        quoteTokenSymbol,
        baseTokenSymbol,
        askVolume,
        askRate,
      ),
    );
  }
  return orderbook;
};

export default getKyberOrderbook;
