import * as Tm from '@melonproject/token-math';
import { withDifferentAccount } from '@melonproject/protocol';
import { returnBatchToVault } from '@melonproject/protocol/lib/contracts/fund/trading/transactions/returnBatchToVault';

const estimateReturnBatchToVault = async (_, { from, fundAddress, assets }, { loaders }) => {
  const environment = await loaders.environment();
  const { tradingAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await returnBatchToVault.prepare(env, tradingAddress.toString(), {
    assets,
  });

  return result && result.rawTransaction;
};

export { estimateReturnBatchToVault };
