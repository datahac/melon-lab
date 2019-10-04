import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, triggerRewardAllFees } from '@melonproject/protocol';

const estimateTriggerRewardAllFees = async (_, { from, fundAddress }, { loaders }) => {
  const environment = await loaders.environment();
  const { accountingAddress } = await loaders.fundRoutes.load(fundAddress);

  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await triggerRewardAllFees.prepare(env, accountingAddress);

  return result && result.rawTransaction;
};

export { estimateTriggerRewardAllFees };
