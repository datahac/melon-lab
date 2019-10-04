import * as Tm from '@melonproject/token-math';
import * as R from 'ramda';

import { getPrice } from '@melonproject/protocol';

export default R.curryN(2, (environment, token: Tm.TokenInterface) => {
  return getPrice(environment, environment.deployment.melonContracts.priceSource, token);
});
