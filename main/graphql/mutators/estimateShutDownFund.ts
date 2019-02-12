import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, shutDownFund } from '@melonproject/protocol';

const estimateShutDownFund = async (
  _,
  { from, fundAddress },
  { environment },
) => {
  const params = {
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await shutDownFund.prepare(
    env,
    environment.deployment.melonContracts.version,
    params,
  );

  return result && result.rawTransaction;
};

export { estimateShutDownFund };
