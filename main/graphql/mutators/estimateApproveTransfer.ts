import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, approve } from '@melonproject/protocol';

const estimateApproveTransfer = async (
  _,
  { from, fundAddress, investmentAmount },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const quoteToken = await loaders.quoteToken();
  const params = {
    howMuch: Tm.createQuantity(quoteToken, investmentAmount),
    spender: participationAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await approve.prepare(env, params);
  return result && result.rawTransaction;
};

export { estimateApproveTransfer };
