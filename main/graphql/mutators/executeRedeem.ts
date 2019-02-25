import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, redeemQuantity } from '@melonproject/protocol';

const executeRedeem = async (
  _,
  { from, signedOrNot, fundAddress },
  { loaders },
) => {
  const environment = await loaders.environment();
  try {
    const transaction = signedOrNot.rawTransaction
      ? signedOrNot.rawTransaction
      : signedOrNot;

    const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
    const env = withDifferentAccount(environment, new Tm.Address(from));

    const result = await redeemQuantity.send(
      env,
      participationAddress,
      transaction,
    );

    return !!result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { executeRedeem };
