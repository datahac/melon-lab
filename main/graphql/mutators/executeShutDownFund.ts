import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, shutDownFund } from '@melonproject/protocol';

const executeShutDownFund = async (
  _,
  { from, signedOrNot, fundAddress },
  { environment },
) => {
  const transaction = signedOrNot.rawTransaction
    ? signedOrNot.rawTransaction
    : signedOrNot;
  const version = environment.deployment.melonContracts.version;

  const params = {
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await shutDownFund.send(env, version, transaction, params);

  return !!result;
};

export { executeShutDownFund };
