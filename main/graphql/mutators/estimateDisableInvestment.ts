import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  disableInvestment,
} from '@melonproject/protocol';

const estimateDisableInvestment = async (
  _,
  { from, fundAddress, assets },
  { environment },
) => {
  const params = {
    assets,
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await disableInvestment.prepare(
    env,
    environment.deployment.melonContracts.version,
    params,
  );

  return result && result.rawTransaction;
};

export { estimateDisableInvestment };
