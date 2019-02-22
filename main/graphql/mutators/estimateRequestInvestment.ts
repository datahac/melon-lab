import * as Tm from '@melonproject/token-math';
import {
  getToken,
  getTokenByAddress,
  withDifferentAccount,
  requestInvestment,
} from '@melonproject/protocol';

const estimateRequestInvestment = async (
  _,
  { from, fundAddress, investmentAmount, investmentAsset, maxPrice },
  { environment, loaders },
) => {
  try {
    const {
      participationAddress,
      sharesAddress,
    } = await loaders.fundRoutes.load(fundAddress);

    const assetToken = getTokenByAddress(environment, investmentAsset);
    const fundToken = await getToken(environment, sharesAddress);

    const sharePrice = Tm.createPrice(
      Tm.createQuantity(fundToken, 1),
      Tm.createQuantity(assetToken, maxPrice || 1),
    );

    const params = {
      investmentAmount: Tm.createQuantity(assetToken, investmentAmount),
      requestedShares: Tm.valueIn(
        sharePrice,
        Tm.createQuantity(assetToken, investmentAmount),
      ),
    };

    const env = withDifferentAccount(environment, new Tm.Address(from));

    const result = await requestInvestment.prepare(
      env,
      participationAddress,
      params,
    );

    return (
      result && {
        ...result.rawTransaction,
        amguInEth: result.amguInEth,
        incentiveInEth: result.incentiveInEth,
      }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { estimateRequestInvestment };
