import * as Tm from '@melonproject/token-math';
import { withDifferentAccount } from '@melonproject/protocol';
import { returnBatchToVault } from '@melonproject/protocol/lib/contracts/fund/trading/transactions/returnBatchToVault';

const executeReturnBatchToVault = async (_, { from, signedOrNot, fundAddress }, { loaders }) => {
  const environment = await loaders.environment();
  try {
    const transaction = signedOrNot.rawTransaction ? signedOrNot.rawTransaction : signedOrNot;

    const { tradingAddress } = await loaders.fundRoutes.load(fundAddress);
    const env = withDifferentAccount(environment, new Tm.Address(from));

    const result = await returnBatchToVault.send(env, tradingAddress, transaction);

    return !!result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { executeReturnBatchToVault };
