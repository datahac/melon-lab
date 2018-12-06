import DataLoader from 'dataloader';
import importWallet from './loaders/wallet/decryptWallet';
import restoreWallet from './loaders/wallet/restoreWallet';
import generateMnemonic from './loaders/wallet/generateMnemonic';
import getFundInception from './loaders/fund/fundInception';
import getFundModules from './loaders/fund/fundModules';
import getFundOwner from './loaders/fund/fundOwner';
import getFundName from './loaders/fund/fundName';
import getFundSettings from './loaders/fund/fundSettings';
import getFundHoldings from './loaders/fund/fundHoldings';
import getFundTotalSupply from './loaders/fund/fundTotalSupply';
import getFundCalculations from './loaders/fund/fundCalculations';
import getFundOpenOrders from './loaders/fund/fundOpenOrders';
import getFundParticipation from './loaders/fund/fundParticipation';
import getFundAddressFromManager from './loaders/fund/fundAddressFromManager';
import getRecentTrades from './loaders/recentTrades';
import getQuoteToken from './loaders/quoteToken';
import {
  getSymbolBalance,
  observeSymbolBalance,
} from './loaders/symbolBalance';
import takeLast from './utils/takeLast';

export default (environment, streams) => {
  const fundAddressFromManager = new DataLoader(pairs => {
    const fn = getFundAddressFromManager(environment);
    const result = pairs.map(pair => fn(pair.managerAddress, pair.version));
    return Promise.all(result || []);
  });

  const fundName = new DataLoader(addresses => {
    const fn = getFundName(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundOwner = new DataLoader(addresses => {
    const fn = getFundOwner(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundSettings = new DataLoader(addresses => {
    const fn = getFundSettings(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundTotalSupply = new DataLoader(addresses => {
    const fn = getFundTotalSupply(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundInception = new DataLoader(addresses => {
    const fn = getFundInception(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundModules = new DataLoader(addresses => {
    const fn = getFundModules(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundCalculations = new DataLoader(addresses => {
    const fn = getFundCalculations(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundHoldings = new DataLoader(addresses => {
    const fn = getFundHoldings(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundOpenOrders = new DataLoader(addresses => {
    const fn = getFundOpenOrders(environment);
    return Promise.all(addresses.map(fn) || []);
  });

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

  const quoteToken = new DataLoader(async () => {
    const { priceSource } = await takeLast(streams.deployment$);
    return getQuoteToken(priceSource);
  });

  return {
    fundAddressFromManager,
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
    symbolBalance,
    symbolBalanceObservable,
    generateMnemonic,
    importWallet,
    restoreWallet,
    fundSettings,
    quoteToken,
  };
};
