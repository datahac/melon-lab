import * as R from 'ramda';
import { getRoutes } from '@melonproject/protocol';

function fundRoutes(environment, address) {
  return getRoutes(environment, address);
}

export default R.curryN(2, fundRoutes);
