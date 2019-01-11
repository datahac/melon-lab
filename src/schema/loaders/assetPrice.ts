import * as R from 'ramda';
import * as Tm from '@melonproject/token-math';
import { getPrice } from '@melonproject/protocol';

export default R.curryN(2, (environment, token: Tm.token.TokenInterface) => {
  return getPrice(
    environment,
    environment.deployment.melonContracts.priceSource,
    token,
  );
});
