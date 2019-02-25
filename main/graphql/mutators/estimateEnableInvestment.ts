import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, enableInvestment } from '@melonproject/protocol';

const estimateEnableInvestment = async (
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
  const result = await enableInvestment.prepare(
    env,
    participationAddress,
    params,
  );

  return result && result.rawTransaction;
};

export { estimateEnableInvestment };
