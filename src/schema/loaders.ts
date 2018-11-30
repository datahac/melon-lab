import DataLoader from 'dataloader';
import importWallet from './loaders/wallet/decryptWallet';
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
import getRecentTrades from './loaders/recentTrades';
import {
  getSymbolBalance,
  observeSymbolBalance,
} from './loaders/symbolBalance';
import getPrice from './loaders/tokenPrice';
import takeLast from './utils/takeLast';

export default (environment, streams) => {
  // TODO: Does this need a custom cache key function?
  const symbolPrice = new DataLoader(symbols => {
    const fn = getPrice(environment);
    return Promise.all(symbols.map(fn) || []);
  });

  const fundAddressFromManager = new DataLoader(pairs => {
    const fn = getFundAddressFromManager(environment);
    const result = pairs.map(pair => fn(pair.managerAddress, pair.fundFactory));
    return Promise.all(result || []);
  });

  const fundContract = new DataLoader(addresses => {
    const fn = getFundContract(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundName = new DataLoader(
    contracts => {
      return Promise.all(contracts.map(getFundName));
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundInception = new DataLoader(
    contracts => {
      return Promise.all(contracts.map(getFundInception));
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundModules = new DataLoader(
    contracts => {
      return Promise.all(contracts.map(getFundModules));
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundOwner = new DataLoader(
    contracts => {
      return Promise.all(contracts.map(getFundOwner));
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundTotalSupply = new DataLoader(
    contracts => {
      return Promise.all(contracts.map(getFundTotalSupply));
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundCalculations = new DataLoader(
    contracts => {
      return Promise.all(contracts.map(getFundCalculations));
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundHoldings = new DataLoader(
    contracts => {
      const fn = getFundHoldings(environment);
      return Promise.all(contracts.map(fn) || []);
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundOpenOrders = new DataLoader(
    contracts => {
      const fn = getFundOpenOrders(environment);
      return Promise.all(contracts.map(fn) || []);
    },
    {
      cacheKeyFn: contract => contract.instance.address,
    },
  );

  const fundParticipation = new DataLoader(
    pairs => {
      const fn = getFundParticipation(environment);
      const result = pairs.map(pair => fn(pair.fund, pair.investor));
      return Promise.all(result || []);
    },
    {
      cacheKeyFn: pair => `${pair.fund.instance.address}:${pair.investor}`,
    },
  );

  const symbolBalance = new DataLoader(
    async pairs => {
      const deployment = await takeLast(streams.deployment$);
      const fn = getSymbolBalance(environment, deployment);
      const result = pairs.map(pair => fn(pair.symbol, pair.address));
      return Promise.all(result || []);
    },
    {
      cacheKeyFn: pair => `${pair.symbol}:${pair.address}`,
    },
  );

  const symbolBalanceObservable = async (symbol, address) => {
    return observeSymbolBalance(environment, streams, symbol, address);
  };

  const recentTrades = new DataLoader(
    pairs => {
      const fn = getRecentTrades(environment);
      const result = pairs.map(pair => fn(pair.base, pair.quote));
      return Promise.all(result || []);
    },
    {
      cacheKeyFn: pair => `${pair.base}:${pair.quote}`,
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
    symbolBalance,
    symbolBalanceObservable,
    generateMnemonic,
    importWallet,
    restoreWallet,
  };
};
