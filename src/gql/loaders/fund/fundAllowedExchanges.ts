import * as R from 'ramda';
import { getAllowedExchanges, Exchanges } from '@melonproject/protocol';

async function fundAllowedExchanges(environment, address) {
  const allowedExchanges = await getAllowedExchanges(environment, address);

  const exchangeMap = {
    [Exchanges.ZeroEx]: 'RADAR_RELAY',
    [Exchanges.MatchingMarket]: 'OASIS_DEX',
    [Exchanges.KyberNetwork]: 'KYBER_NETWORK',
    [Exchanges.Ethfinex]: 'ETHFINEX',
    [Exchanges.MelonEngine]: 'MELON_ENGINE',
  };

  return allowedExchanges.map(item => exchangeMap[item]);
}

export default R.curryN(2, fundAllowedExchanges);
