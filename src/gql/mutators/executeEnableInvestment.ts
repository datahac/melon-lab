import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, enableInvestment } from '@melonproject/protocol';

const executeEnableInvestment = async (_, { from, signedOrNot, fundAddress, assets }, { loaders }) => {
  const environment = await loaders.environment();
  const transaction = signedOrNot.rawTransaction ? signedOrNot.rawTransaction : signedOrNot;

  const params = {
    assets,
  };

  const { participationAddress } = await loaders.fundRoutes.load(fundAddress);
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await enableInvestment.send(env, participationAddress, transaction, params);

  return !!result;
};

export { executeEnableInvestment };
