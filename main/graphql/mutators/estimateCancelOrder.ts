import * as R from 'ramda';

import {
  getOasisDexOrder,
  withDifferentAccount,
  cancelOasisDexOrder,
} from '@melonproject/protocol';

const estimateCancelOrder = async (
  _,
  { from, id, exchange },
  { environment, loaders },
) => {
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  if (exchange === 'OASIS_DEX') {
    const oasisDex = R.path(
      ['deployment', 'thirdPartyContracts', 'exchanges', 'matchingMarket'],
      env,
    );

    const order = await getOasisDexOrder(env, oasisDex, { id });

    // const makerAsset = new Tm.Address(
    //   getTokenBySymbol(env, sellToken).address || '',
    // );
    // const takerAsset = new Tm.Address(
    //   getTokenBySymbol(env, buyToken).address || '',
    // );

    const result = await cancelOasisDexOrder.prepare(env, tradingAddress, {
      id: id.toString(),
      maker: tradingAddress.toString(),
      makerAsset: order.sell.token.address,
      takerAsset: order.buy.token.address,
    });

    return result && result.rawTransaction;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { estimateCancelOrder };
