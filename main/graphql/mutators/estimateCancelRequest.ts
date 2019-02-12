import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, cancelRequest } from '@melonproject/protocol';

const estimateCancelRequest = async (
  _,
  { from, fundAddress },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await cancelRequest.prepare(env, participationAddress);

  return result && result.rawTransaction;
};

export { estimateCancelRequest };
