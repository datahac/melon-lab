import * as Tm from '@melonproject/token-math';
import {
  getToken,
  withDifferentAccount,
  requestInvestment,
} from '@melonproject/protocol';

const estimateRequestInvestment = async (
  _,
  { from, fundAddress, investmentAmount, maxPrice },
  { environment, loaders },
) => {
  try {
    const { tokens } = environment.deployment.thirdPartyContracts;
    const {
      participationAddress,
      sharesAddress,
    } = await loaders.fundRoutes.load(fundAddress);
    const nativeToken = tokens.find(token => {
      return token.symbol === 'WETH';
    });

    const fundToken = await getToken(environment, sharesAddress);

    const sharePrice = Tm.createPrice(
      Tm.createQuantity(fundToken, 1),
      Tm.createQuantity(nativeToken, maxPrice || 1),
    );

    const params = {
      investmentAmount: Tm.createQuantity(nativeToken, investmentAmount),
      requestedShares: Tm.valueIn(
        sharePrice,
        Tm.createQuantity(nativeToken, investmentAmount),
      ),
    };

    const env = withDifferentAccount(environment, new Tm.Address(from));

    const result = await requestInvestment.prepare(
      env,
      participationAddress,
      params,
    );

    return result && result.rawTransaction;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { estimateRequestInvestment };
