import * as Tm from '@melonproject/token-math';
import { approve, withDifferentAccount } from '@melonproject/protocol';

const executeApproveTransfer = async (
  _,
  { from, signedOrNot, fundAddress, investmentAmount },
  { environment, loaders },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const quoteToken = await loaders.quoteToken();
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const params = {
    howMuch: Tm.createQuantity(quoteToken, investmentAmount),
    spender: participationAddress,
  };

  const result = await approve.send(env, transaction, params);

  return !!result;
};

export { executeApproveTransfer };
