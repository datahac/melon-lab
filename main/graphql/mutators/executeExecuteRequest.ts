import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, executeRequest } from '@melonproject/protocol';

const executeExecuteRequest = async (
  _,
  { from, signed, fundAddress },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const transaction = signed.rawTransaction;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await executeRequest.send(
    env,
    participationAddress,
    transaction,
  );

  return !!result;
};

export { executeExecuteRequest };
