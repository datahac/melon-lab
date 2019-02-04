import * as R from 'ramda';
import { getRoutes, hasValidRequest, getRequest } from '@melonproject/protocol';

async function hasActiveRequest(environment, { fundAddress, userAddress }) {
  const { participationAddress } = await getRoutes(environment, fundAddress);
  const request = await getRequest(environment, participationAddress, {
    of: userAddress,
  });
  if (!request) return null;
  const isValid = await hasValidRequest(environment, participationAddress, {
    investor: userAddress,
  });
  return {
    invest: request.investmentAmount,
    shares: request.requestedShares,
    waitingTime: isValid ? 0 : 24 * 60 * 60,
  };
}

export default R.curryN(2, hasActiveRequest);
