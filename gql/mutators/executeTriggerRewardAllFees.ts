import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, triggerRewardAllFees } from '@melonproject/protocol';

const executeTriggerRewardAllFees = async (_, { from, signedOrNot, fundAddress }, { loaders }) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction ? signedOrNot.rawTransaction : signedOrNot;

  const { accountingAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await triggerRewardAllFees.send(env, accountingAddress, transaction);

  return !!result;
};
export { executeTriggerRewardAllFees };
