import * as R from 'ramda';
import * as protocol from '@melonproject/protocol';
import { distinctUntilChanged, map } from 'rxjs/operators';

function currentDeployment(environment, network$) {
  const fn = R.curryN(2, protocol.utils.solidity.getDeploymentSync)(R.__, environment);

  return network$.pipe(
    distinctUntilChanged(),
    map(fn),
  );
}

export default currentDeployment;
