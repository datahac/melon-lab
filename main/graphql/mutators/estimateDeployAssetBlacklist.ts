import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  deployContract,
  Contracts,
} from '@melonproject/protocol';

const estimateDeployAssetBlacklist = async (
  _,
  { from, addresses },
  { loaders },
) => {
  const environment = await loaders.environment();
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await deployContract.prepare(env, Contracts.AssetBlacklist, [
    addresses,
  ]);

  return result.unsignedTransaction;
};

export { estimateDeployAssetBlacklist };
