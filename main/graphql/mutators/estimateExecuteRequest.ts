import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, executeRequest } from '@melonproject/protocol';

const estimateExecuteRequest = async (
  _,
  { from, fundAddress },
  { loaders },
) => {
  const environment = await loaders.environment();
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await executeRequest.prepare(env, participationAddress);

  return result && { ...result.rawTransaction, amguInEth: result.amguInEth };
};

export { estimateExecuteRequest };
