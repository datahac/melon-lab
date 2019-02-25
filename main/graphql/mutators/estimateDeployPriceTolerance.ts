import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  deployContract,
  Contracts,
} from '@melonproject/protocol';

const estimateDeployPriceTolerance = async (
  _,
  { from, percent },
  { loaders },
) => {
  const environment = await loaders.environment();
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await deployContract.prepare(env, Contracts.PriceTolerance, [
    `${percent}`,
  ]);

  return result.unsignedTransaction;
};

export { estimateDeployPriceTolerance };
