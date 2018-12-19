import * as R from 'ramda';
import { getDenominationAsset } from '@melonproject/protocol';

function fundDenominationAsset(environment, address) {
  return getDenominationAsset(environment, address);
}

export default R.curryN(2, fundDenominationAsset);
