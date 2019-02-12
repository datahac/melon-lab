import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, executeRequest } from '@melonproject/protocol';

const executeExecuteRequest = async (
  _,
  { from, signedOrNot, fundAddress },
  { environment, loaders },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await executeRequest.send(
    env,
    participationAddress,
    transaction,
  );

  return !!result;
};

export { executeExecuteRequest };
