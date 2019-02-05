import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  requestInvestment,
} from '@melonproject/protocol';

const executeRequestInvestment = async (
  _,
  { from, signed, fundAddress },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const transaction = signed.rawTransaction;
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await requestInvestment.send(
    env,
    participationAddress,
    transaction,
  );

  return !!result;
};

export { executeRequestInvestment };
