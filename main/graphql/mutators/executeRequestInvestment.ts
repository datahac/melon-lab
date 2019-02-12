import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  requestInvestment,
} from '@melonproject/protocol';

const executeRequestInvestment = async (
  _,
  { from, signedOrNot, fundAddress },
  { environment, loaders },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await requestInvestment.send(
    env,
    participationAddress,
    transaction,
  );

  return !!result;
};

export { executeRequestInvestment };
