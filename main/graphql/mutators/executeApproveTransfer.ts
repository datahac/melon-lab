import * as Tm from '@melonproject/token-math';
import { approve, withDifferentAccount } from '@melonproject/protocol';

const executeApproveTransfer = async (
  _,
  { from, signed, fundAddress, investmentAmount },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const quoteToken = await loaders.quoteToken();
  const transaction = signed.rawTransaction;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const params = {
    howMuch: Tm.createQuantity(quoteToken, investmentAmount),
    spender: participationAddress,
  };

  const result = await approve.send(env, transaction, params);

  return !!result;
};

export { executeApproveTransfer };
