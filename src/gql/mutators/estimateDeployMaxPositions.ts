import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, deployContract, Contracts } from '@melonproject/protocol';

const estimateDeployMaxPositions = async (_, { from, positions }, { loaders }) => {
  const environment = await loaders.environment();
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await deployContract.prepare(env, Contracts.MaxPositions, [`${positions}`]);

  return result.unsignedTransaction;
};

export { estimateDeployMaxPositions };
