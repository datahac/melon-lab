import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, cancelRequest } from '@melonproject/protocol';

const executeCancelRequest = async (
  _,
  { from, signedOrNot, fundAddress },
  { loaders },
) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await cancelRequest.send(
    env,
    participationAddress,
    transaction,
  );

  return !!result;
};
export { executeCancelRequest };
