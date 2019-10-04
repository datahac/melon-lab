import * as R from 'ramda';

import * as Tm from '@melonproject/token-math';
import {
  getOasisDexOrder,
  withDifferentAccount,
  cancelOasisDexOrder,
  cancel0xOrder,
  cancelEthfinexOrder,
} from '@melonproject/protocol';

const estimateCancelOrder = async (_, { from, id, exchange }, { loaders }) => {
  const environment = await loaders.environment();
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  if (exchange === 'OASIS_DEX') {
    const oasisDex = R.path(['deployment', 'thirdPartyContracts', 'exchanges', 'matchingMarket'], env);

    const order = await getOasisDexOrder(env, oasisDex, { id });

    const result = await cancelOasisDexOrder.prepare(env, tradingAddress, {
      id: id.toString(),
      maker: tradingAddress.toString(),
      makerAsset: order.sell.token.address,
      takerAsset: order.buy.token.address,
    });

    return result && result.rawTransaction;
  }

  if (exchange === 'RADAR_RELAY') {
    const result = await cancel0xOrder.prepare(env, tradingAddress, {
      orderHashHex: id,
    });
    return result && result.rawTransaction;
  }

  if (exchange === 'ETHFINEX') {
    const result = await cancelEthfinexOrder.prepare(env, tradingAddress, {
      orderHashHex: id,
    });
    return result && result.rawTransaction;
  }
  throw new Error(`Cancel order not implemented for ${exchange}`);
};

export { estimateCancelOrder };
