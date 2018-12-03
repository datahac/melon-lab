import * as R from 'ramda';

function fundParticipation(environment, fund, investor) {
  // TODO: Implement this again.
  return null;
  // return (
  //   environment &&
  //   getParticipation(environment, {
  //     fundAddress: fund.instance.address,
  //     investorAddress: investor,
  //   })
  // );
}

export default R.curryN(3, fundParticipation);
