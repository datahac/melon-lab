import * as R from 'ramda';
import { childExists } from '@melonproject/protocol';

async function fundIsComplete(environment, fundAddress) {
  return childExists(
    environment,
    environment.deployment.melonContracts.version,
    fundAddress,
  );
}

export default R.curryN(2, fundIsComplete);
