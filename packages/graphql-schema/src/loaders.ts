import DataLoader from 'dataloader';
import takeLast from './utils/takeLast';
import decryptWallet from './loaders/wallet/decryptWallet';
import restoreWallet from './loaders/wallet/restoreWallet';
import generateMnemonic from './loaders/wallet/generateMnemonic';
import getFundContract from './loaders/fund/fundContract';
import getFundInception from './loaders/fund/fundInception';
import getFundModules from './loaders/fund/fundModules';
import getFundOwner from './loaders/fund/fundOwner';
import getFundName from './loaders/fund/fundName';
import getFundHoldings from './loaders/fund/fundHoldings';
import getFundTotalSupply from './loaders/fund/fundTotalSupply';
import getFundCalculations from './loaders/fund/fundCalculations';
import getFundOpenOrders from './loaders/fund/fundOpenOrders';
import getFundParticipation from './loaders/fund/fundParticipation';
import getFundAddressFromManager from './loaders/fund/fundAddressFromManager';
import getNativeBalance from './loaders/balance/nativeBalance';
import getEtherBalance from './loaders/balance/etherBalance';
import getMelonBalance from './loaders/balance/melonBalance';
import getRecentTrades from './loaders/recentTrades';
import getPrice from './loaders/tokenPrice';

const contractCache = contract => contract.instance.address;

export default async streams => {
  // TODO: Does this need a custom cache key function?
  const symbolPrice = new DataLoader(async symbols => {
    const environment = await takeLast(streams.environment$);
    const fn = getPrice(environment);
    return Promise.all(symbols.map(fn));
  });

  const fundAddressFromManager = new DataLoader(async addresses => {
    const environment = await takeLast(streams.environment$);
    const fn = getFundAddressFromManager(environment);
    return environment && addresses.map(fn);
  });

  const fundContract = new DataLoader(async addresses => {
    const environment = await takeLast(streams.environment$);
    const fn = getFundContract(environment);
    return environment && addresses.map(fn);
  });

  const fundName = new DataLoader(
    contracts => Promise.all(contracts.map(getFundName)),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundInception = new DataLoader(
    contracts => Promise.all(contracts.map(getFundInception)),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundModules = new DataLoader(
    contracts => Promise.all(contracts.map(getFundModules)),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundOwner = new DataLoader(
    contracts => Promise.all(contracts.map(getFundOwner)),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundTotalSupply = new DataLoader(
    contracts => Promise.all(contracts.map(getFundTotalSupply)),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundCalculations = new DataLoader(
    contracts => Promise.all(contracts.map(getFundCalculations)),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundHoldings = new DataLoader(
    async contracts => {
      const environment = await takeLast(streams.environment$);
      const fn = getFundHoldings(environment);
      return Promise.all(contracts.map(fn));
    },
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundOpenOrders = new DataLoader(
    async contracts => {
      const environment = await takeLast(streams.environment$);
      const config = await takeLast(streams.config$);
      const fn = getFundOpenOrders(environment, config);
      return environment && config && Promise.all(contracts.map(fn));
    },
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundParticipation = new DataLoader(
    async pairs => {
      const environment = await takeLast(streams.environment$);
      const fn = getFundParticipation(environment);
      const result = pairs.map(pair => fn(pair.fund, pair.investor));

      return environment && Promise.all(result);
    },
    {
      cacheKeyFn: pair => `${contractCache(pair.fund)}:${pair.investor}`,
    },
  );

  const etherBalance = new DataLoader(async addresses => {
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const fn = getEtherBalance(environment, config);
    return environment && config && Promise.all(addresses.map(fn));
  });

  const melonBalance = new DataLoader(async addresses => {
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const fn = getMelonBalance(environment, config);
    return environment && config && Promise.all(addresses.map(fn));
  });

  const nativeBalance = new DataLoader(async addresses => {
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const fn = getNativeBalance(environment, config);
    return environment && config && Promise.all(addresses.map(fn));
  });

  const recentTrades = new DataLoader(
    async pairs => {
      const environment = await takeLast(streams.environment$);
      const fn = getRecentTrades(environment);
      const result = pairs.map(pair =>
        fn(pair.baseTokenSymbol, pair.quoteTokenSymbol),
      );

      return environment && Promise.all(result);
    },
    {
      cacheKeyFn: pair => `${pair.baseTokenSymbol}:${pair.quoteTokenSymbol}`,
    },
  );

  return {
    fundAddressFromManager,
    fundContract,
    fundName,
    fundInception,
    fundModules,
    fundOwner,
    fundTotalSupply,
    fundCalculations,
    fundHoldings,
    fundOpenOrders,
    fundParticipation,
    recentTrades,
    symbolPrice,
    nativeBalance,
    melonBalance,
    etherBalance,
    generateMnemonic,
    decryptWallet,
    restoreWallet,
  };
};
