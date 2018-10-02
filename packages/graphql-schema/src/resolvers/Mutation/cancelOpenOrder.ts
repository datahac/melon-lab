import { cancelOrder } from '@melonproject/melon.js';

async function cancelOpenOrder(parent, args, context) {
  return cancelOrder(context.environment, {
    identifier: args.orderId,
    fundAddress: args.fundAddress,
    makerAssetSymbol: args.makerAssetSymbol,
    takerAssetSymbol: args.takerAssetSymbol,
  });
}

export default cancelOpenOrder;
