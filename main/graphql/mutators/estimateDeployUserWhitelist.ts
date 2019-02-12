import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  deployContract,
  Contracts,
} from '@melonproject/protocol';

const estimateDeployUserWhitelist = async (
  _,
  { from, addresses },
  { environment },
) => {
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await deployContract.prepare(env, Contracts.UserWhitelist, [
    addresses,
  ]);

  return result.unsignedTransaction;
};

export { estimateDeployUserWhitelist };
