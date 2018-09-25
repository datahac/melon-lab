// @flow
import BigNumber from 'bignumber.js';
import getConfig from '../../version/calls/getConfig';
import takeOrder from './takeOrder';
import swapTokens from './swapTokens';


/**
 * Takes multiple orders from fund at `fundAddress` upon to `fillTakerTokenAmount`
 * @param orders sorted and filtered orders by matchOrders
 */
const takeMultipleOrders = async (
  environment,
  { orders, fundAddress, fillTakerTokenAmount, exchangeNumber = 0 },
): Promise<BigNumber> => {
  const config = await getConfig(environment)
  return orders.reduce(async (accumulatorPromise: Promise<*>, currentOrder: any) => {
    let remainingQuantity = await accumulatorPromise;
    if (remainingQuantity.gt(0)) {
      let result
      if (currentOrder.exchangeAddress === config.KyberNetworkAddress) {
        result = await swapTokens(environment, {
          fundAddress,
          exchangeAddress: currentOrder.exchangeContractAddress,
          srcTokenSymbol: currentOrder.buy.symbol,
          destTokenSymbol: currentOrder.sell.symbol,
          srcAmount: remainingQuantity,
          destAmount: remainingQuantity.div(currentOrder.buy.howMuch).mul(currentOrder.sell.howMuch)
        })
      } else {
        result = await takeOrder(environment, {
          fundAddress,
          exchangeAddress: currentOrder.exchangeContractAddress,
          maker: currentOrder.maker,
          taker: currentOrder.taker,
          makerAssetSymbol: currentOrder.sell.symbol,
          takerAssetSymbol: currentOrder.buy.symbol,
          feeRecipient: currentOrder.feeRecipient,
          makerQuantity: currentOrder.sell.howMuch,
          takerQuantity: currentOrder.buy.howMuch,
          makerFee: currentOrder.makerFee,
          takerFee: currentOrder.takerFee,
          timestamp: currentOrder.expiration,
          salt: currentOrder.salt,
          fillTakerTokenAmount: remainingQuantity,
          identifier: currentOrder.id,
          signature: currentOrder.signature,
        });

      }
      remainingQuantity = remainingQuantity.minus(result.executedQuantity);
    }

    return remainingQuantity;
  }, Promise.resolve(new BigNumber(fillTakerTokenAmount)));
}

export default takeMultipleOrders;
