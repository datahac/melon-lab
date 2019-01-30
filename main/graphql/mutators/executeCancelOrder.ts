import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  cancelOasisDexOrder,
} from '@melonproject/protocol';

const executeCancelOrder = async (
  _,
  { from, signed, exchange },
  { environment, loaders },
) => {
  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  if (exchange === 'OASIS_DEX') {
    const result = await cancelOasisDexOrder.send(
      env,
      tradingAddress,
      signed.rawTransaction,
    );

    return !!result;
  }

  throw new Error(`Make order not implemented for ${exchange}`);
};

export { executeCancelOrder };
