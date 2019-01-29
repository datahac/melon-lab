import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  getTokenBySymbol,
  makeOasisDexOrder,
} from '@melonproject/protocol';

const estimateMakeOrder = async (
  _,
  { from, exchange, buyToken, buyQuantity, sellToken, sellQuantity },
  { environment, loaders },
) => {
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  if (exchange === 'OASIS_DEX') {
    const makerQuantity = Tm.createQuantity(
      getTokenBySymbol(environment, sellToken),
      sellQuantity,
    );
    const takerQuantity = Tm.createQuantity(
      getTokenBySymbol(environment, buyToken),
      buyQuantity,
    );

    const result = await makeOasisDexOrder.prepare(env, tradingAddress, {
      makerQuantity,
      takerQuantity,
    });

    return result && result.rawTransaction;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { estimateMakeOrder };
