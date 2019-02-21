import * as Tm from '@melonproject/token-math';
import {
  withDifferentAccount,
  beginSetup,
  getTokenByAddress,
} from '@melonproject/protocol';

const estimateFundSetupBegin = async (
  _,
  {
    from,
    name,
    exchanges,
    assets,
    managementFee,
    performanceFee,
    feePeriod = '90',
  },
  { environment, loaders },
) => {
  const quoteToken = await loaders.quoteToken();
  const {
    exchangeConfigs,
    melonContracts: { priceSource, version },
    thirdPartyContracts: { tokens },
  } = environment.deployment;

  const selectedExchanges = {
    ...(exchanges.includes('ZERO_EX_EXCHANGE') && {
      ZeroEx: exchangeConfigs.ZeroEx,
    }),
    ...(exchanges.includes('MATCHING_MARKET') && {
      MatchingMarket: exchangeConfigs.MatchingMarket,
    }),
    ...(exchanges.includes('KYBER_NETWORK') && {
      KyberNetwork: exchangeConfigs.KyberNetwork,
    }),
    ...(exchanges.includes('ETHFINEX') && {
      Ethfinex: exchangeConfigs.Ethfinex,
    }),
    ...(exchanges.includes('MELON_ENGINE') && {
      Ethfinex: exchangeConfigs.MelonEngine,
    }),
  };

  const nativeToken = tokens.find(token => {
    return token.symbol === 'WETH';
  });

  const fees = [
    {
      feeAddress: environment.deployment.melonContracts.fees.managementFee.toLowerCase(),
      feePeriod: new Tm.BigInteger(0),
      feeRate: new Tm.BigInteger(
        Tm.multiply(
          new Tm.BigInteger(Math.round(parseFloat(managementFee) * 10000)),
          Tm.power(new Tm.BigInteger(10), new Tm.BigInteger(12)),
        ),
      ),
    },
    {
      feeAddress: environment.deployment.melonContracts.fees.performanceFee.toLowerCase(),
      feePeriod: new Tm.BigInteger(Math.round(86400 * parseFloat(feePeriod))),
      feeRate: new Tm.BigInteger(
        Tm.multiply(
          new Tm.BigInteger(Math.round(parseFloat(performanceFee) * 10000)),
          Tm.power(new Tm.BigInteger(10), new Tm.BigInteger(12)),
        ),
      ),
    },
  ];

  const defaultTokens = assets
    .map(address => getTokenByAddress(environment, address))
    .filter(token => !!token);

  const params = {
    fees,
    priceSource,
    quoteToken,
    nativeToken,
    defaultTokens,
    exchangeConfigs: selectedExchanges,
    fundName: name,
  };

  // TODO: The environment should not hold account data. Maybe?
  const env = withDifferentAccount(environment, new Tm.Address(from));
  const result = await beginSetup.prepare(env, version, params);

  return result && result.rawTransaction;
};

export { estimateFundSetupBegin };
