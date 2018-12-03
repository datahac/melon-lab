import * as R from 'ramda';

async function fundHoldings(environment, contract) {
  // TODO: Implement this again.
  return null;
  // const address = contract.instance.address;
  // const holdings =
  //   (environment &&
  //     (await getHoldingsAndPrices(environment, {
  //       fundAddress: address,
  //     }))) ||
  //   [];

  // return holdings.map(holding => ({
  //   ...holding,
  //   fund: address,
  // }));
}

export default R.curryN(2, fundHoldings);
