import * as R from 'ramda';
import { getParticipation } from '@melonproject/melon.js';

function fundParticipation(environment, fund, investor) {
  return (
    environment &&
    getParticipation(environment, {
      fundAddress: fund.instance.address,
      investorAddress: investor,
    })
  );
}

export default R.curryN(3, fundParticipation);
