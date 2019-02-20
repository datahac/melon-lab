import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, enableInvestment } from '@melonproject/protocol';

const estimateEnableInvestment = async (
  _,
  { from, fundAddress, assets },
  { environment },
) => {
  const params = {
    assets,
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await enableInvestment.prepare(
    env,
    environment.deployment.melonContracts.version,
    params,
  );

  return result && result.rawTransaction;
};

export { estimateEnableInvestment };
