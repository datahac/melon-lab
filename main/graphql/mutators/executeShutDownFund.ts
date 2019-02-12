import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, shutDownFund } from '@melonproject/protocol';

const executeShutDownFund = async (
  _,
  { from, signed, fundAddress },
  { environment },
) => {
  const version = environment.deployment.melonContracts.version;
  const transaction = signed.rawTransaction;
  const params = {
    hub: fundAddress,
  };

  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await shutDownFund.send(env, version, transaction, params);

  return !!result;
};

export { executeShutDownFund };
