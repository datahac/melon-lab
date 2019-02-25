import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  disableInvestment,
} from '@melonproject/protocol';

const estimateDisableInvestment = async (
  _,
  { from, fundAddress, assets },
  { loaders },
) => {
  const environment = await loaders.environment();
  const params = {
    assets,
  };

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await disableInvestment.prepare(
    env,
    participationAddress,
    params,
  );

  return result && result.rawTransaction;
};

export { estimateDisableInvestment };
