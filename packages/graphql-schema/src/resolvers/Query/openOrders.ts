import { getOpenOrders } from '@melonproject/melon.js';

async function openOrders(parent, args, context) {
  const { environment, config } = context;
  const orders = (await getOpenOrders(environment, {
    fundAddress: args.address,
  })).map(order => ({
    id: order.exchangeOrderId,
    isActive: true,
    exchange: 'OASIS_DEX',
    exchangeContractAddress: config.matchingMarketAddress,
    type: order.type,
    price: order.price,
    buy: {
      symbol: order.buySymbol,
      howMuch: order.buyHowMuch,
    },
    sell: {
      symbol: order.sellSymbol,
      howMuch: order.sellHowMuch,
    },
    timestamp: order.timestamp,
  }));

  return orders;
}

export default openOrders;
