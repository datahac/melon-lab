import * as R from 'ramda';
import { getOpenOrders } from '@melonproject/melon.js';

async function fundOpenOrders(environment, config, contract) {
  const address = contract.instance.address;
  const orders =
    (environment &&
      (await getOpenOrders(environment, {
        fundAddress: address,
      }))) ||
    [];

  return orders.map(order => ({
    id: order.exchangeOrderId,
    isActive: true,
    exchange: 'OASIS_DEX',
    exchangeContractAddress: config && config.matchingMarketAddress,
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
}

export default R.curryN(3, fundOpenOrders);
