import * as R from 'ramda';
import { investAllowed } from '@melonproject/protocol';

async function fundInvestAllowed(environment, tokens, address) {
  const allowed = await Promise.all(
    tokens.map(token => {
      investAllowed(environment, address, { asset: token.address });
    }),
  );

  return tokens.filter((_, key) => !!allowed[key]);
}

export default R.curryN(3, fundInvestAllowed);
