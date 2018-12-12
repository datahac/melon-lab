import * as R from 'ramda';
import { getPrice } from '@melonproject/protocol';
import { TokenInterface } from '@melonproject/token-math/token';

export default R.curryN(2, (environment, token: TokenInterface) => {
  return getPrice(environment, environment.deployment.priceSource, token);
});
