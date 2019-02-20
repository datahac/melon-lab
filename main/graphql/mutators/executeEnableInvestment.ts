import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, enableInvestment } from '@melonproject/protocol';

const executeEnableInvestment = async (
  _,
  { from, signedOrNot, fundAddress, assets },
  { environment },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;
  const version = environment.deployment.melonContracts.version;

  const params = {
    assets,
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await enableInvestment.send(env, version, transaction, params);

  return !!result;
};

export { executeEnableInvestment };
