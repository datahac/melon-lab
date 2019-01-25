import * as R from 'ramda';
import { getFundHoldings } from '@melonproject/protocol';

async function fundHoldings(environment, address) {
  const holdings = await getFundHoldings(environment, address);
  const availableTokens = R.pathOr(
    [],
    ['deployment', 'thirdPartyContracts', 'tokens'],
    environment,
  ).map(value => {
    return {
      quantity: 0,
      token: value,
    };
  });

  const fundHoldings = R.unionWith(
    R.eqBy(R.path(['token', 'symbol'])),
    holdings,
    availableTokens,
  );

  return fundHoldings;
}

export default R.curryN(2, fundHoldings);
