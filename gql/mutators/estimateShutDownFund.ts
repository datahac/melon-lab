import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, shutDownFund } from '@melonproject/protocol';

const estimateShutDownFund = async (_, { from, fundAddress }, { loaders }) => {
  const environment = await loaders.environment();
  const params = {
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await shutDownFund.prepare(env, environment.deployment.melonContracts.version, params);

  return result && result.rawTransaction;
};

export { estimateShutDownFund };
