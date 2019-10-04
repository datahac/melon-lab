import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, getTokenByAddress, approve } from '@melonproject/protocol';

const estimateApproveTransfer = async (_, { from, fundAddress, investmentAmount, investmentAsset }, { loaders }) => {
  const environment = await loaders.environment();
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const investmentToken = getTokenByAddress(environment, investmentAsset);
  const params = {
    howMuch: Tm.createQuantity(investmentToken, investmentAmount),
    spender: participationAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await approve.prepare(env, params);
  return result && result.rawTransaction;
};

export { estimateApproveTransfer };
