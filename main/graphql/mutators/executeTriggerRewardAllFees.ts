import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  triggerRewardAllFees,
} from '@melonproject/protocol';

const executeTriggerRewardAllFees = async (
  _,
  { from, signed, fundAddress },
  { environment, loaders },
) => {
  const { accountingAddress } = await loaders.fundRoutes.load(fundAddress);
  const transaction = signed.rawTransaction;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await triggerRewardAllFees.send(
    env,
    accountingAddress,
    transaction,
  );

  return !!result;
};
export { executeTriggerRewardAllFees };
