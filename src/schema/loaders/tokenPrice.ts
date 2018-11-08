import * as R from 'ramda';
import { getPrice } from '@melonproject/melon.js';

function tokenPrice(environment, token) {
  return environment && getPrice(environment, token);
}

export default R.curryN(2, tokenPrice);
