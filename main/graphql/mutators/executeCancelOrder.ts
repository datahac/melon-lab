import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  cancelOasisDexOrder,
  cancel0xOrder,
  cancelEthfinexOrder,
} from '@melonproject/protocol';

const executeCancelOrder = async (
  _,
  { from, signedOrNot, exchange },
  { environment, loaders },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const fund = await loaders.fundAddressFromManager.load(from);
  const { tradingAddress } = await loaders.fundRoutes.load(fund);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  if (exchange === 'OASIS_DEX') {
    const result = await cancelOasisDexOrder.send(
      env,
      tradingAddress,
      transaction,
    );

    return !!result;
  }

  if (exchange === 'RADAR_RELAY') {
    const result = await cancel0xOrder.send(env, tradingAddress, transaction);

    return !!result;
  }

  if (exchange === 'ETHFINEX') {
    const result = await cancelEthfinexOrder.send(
      env,
      tradingAddress,
      transaction,
    );

    return !!result;
  }

  throw new Error(`Cancel order not implemented for ${exchange}`);
};

export { executeCancelOrder };
