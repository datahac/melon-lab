import * as R from 'ramda';
import { balanceOf } from '@melonproject/protocol';

function fundParticipation(environment, sharesAddress, investorAddress) {
  return balanceOf(environment, sharesAddress, { address: investorAddress });
}

export default R.curryN(3, fundParticipation);
