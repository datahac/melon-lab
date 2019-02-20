import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  disableInvestment,
} from '@melonproject/protocol';

const executeDisableInvestment = async (
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
  const result = await disableInvestment.send(
    env,
    version,
    transaction,
    params,
  );

  return !!result;
};

export { executeDisableInvestment };
