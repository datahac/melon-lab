import * as Tm from '@melonproject/token-math';
import {
  getFundToken,
  withDifferentAccount,
  redeemQuantity,
} from '@melonproject/protocol';

const estimateRedeem = async (
  _,
  { from, fundAddress, sharesQuantity },
  { environment, loaders },
) => {
  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);

  const fundToken = await getFundToken(environment, fundAddress);
  const quantity = Tm.createQuantity(fundToken, sharesQuantity);
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await redeemQuantity.prepare(
    env,
    participationAddress.toString(),
    {
      sharesQuantity: quantity,
    },
  );
  return result && result.rawTransaction;
};

export { estimateRedeem };
