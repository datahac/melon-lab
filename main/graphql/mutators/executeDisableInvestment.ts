import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  disableInvestment,
} from '@melonproject/protocol';

const executeDisableInvestment = async (
  _,
  { from, signedOrNot, fundAddress, assets },
  { environment, loaders },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const params = {
    assets,
  };

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await disableInvestment.send(
    env,
    participationAddress,
    transaction,
    params,
  );

  return !!result;
};

export { executeDisableInvestment };
