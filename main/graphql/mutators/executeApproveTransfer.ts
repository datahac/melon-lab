import * as Tm from '@melonproject/token-math';
import {
  approve,
  getTokenByAddress,
  withDifferentAccount,
} from '@melonproject/protocol';

const executeApproveTransfer = async (
  _,
  { from, signedOrNot, fundAddress, investmentAmount, investmentAsset },
  { loaders },
) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const investmentToken = getTokenByAddress(environment, investmentAsset);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const params = {
    howMuch: Tm.createQuantity(investmentToken, investmentAmount),
    spender: participationAddress,
  };

  const result = await approve.send(env, transaction, params);

  return !!result;
};

export { executeApproveTransfer };
