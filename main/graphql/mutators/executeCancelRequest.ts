import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, cancelRequest } from '@melonproject/protocol';

const executeCancelRequest = async (
  _,
  { from, signed, fundAddress },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const transaction = signed.rawTransaction;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await cancelRequest.send(
    env,
    participationAddress,
    transaction,
  );

  return !!result;
};
export { executeCancelRequest };
