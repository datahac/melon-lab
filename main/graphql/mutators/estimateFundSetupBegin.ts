import * as Tm from '@melonproject/token-math';
import { withDifferentAccount, beginSetup } from '@melonproject/protocol';

const estimateFundSetupBegin = async (
  _,
  { from, name, exchanges, managementFee, performanceFee },
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
  };

  const nativeToken = tokens.find(token => {
    return token.symbol === 'WETH';
  });

  const mlnToken = tokens.find(token => {
    return token.symbol === 'MLN';
  });

  const fees = [
    {
      feeAddress: environment.deployment.melonContracts.fees.managementFee.toLowerCase(),
      feePeriod: new Tm.BigInteger(0),
      feeRate: new Tm.BigInteger(
        Tm.multiply(
          new Tm.BigInteger(managementFee),
          Tm.power(new Tm.BigInteger(10), new Tm.BigInteger(16)),
        ),
      ),
    },
    {
      feeAddress: environment.deployment.melonContracts.fees.performanceFee.toLowerCase(),
      feePeriod: new Tm.BigInteger(86400 * 90),
      feeRate: new Tm.BigInteger(
        Tm.multiply(
          new Tm.BigInteger(performanceFee),
          Tm.power(new Tm.BigInteger(10), new Tm.BigInteger(16)),
        ),
      ),
    },
  ];

  const params = {
    fees,
    priceSource,
    quoteToken,
    nativeToken,
    defaultTokens: [quoteToken, mlnToken],
    exchangeConfigs: selectedExchanges,
    fundName: name,
  };

  // TODO: The environment should not hold account data. Maybe?
  const env = withDifferentAccount(environment, new Tm.Address(from));

  const result = await beginSetup.prepare(env, version, params);

  return result && result.rawTransaction;
};

export { estimateFundSetupBegin };
