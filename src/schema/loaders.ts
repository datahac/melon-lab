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
import getAssetPrice from './loaders/assetPrice';
import getStepFor from './loaders/stepFor';
import {
  getSymbolBalance,
  observeSymbolBalance,
} from './loaders/symbolBalance';

export default (environment, streams) => {
  const fundAddressFromManager = new DataLoader(addresses => {
    const fn = getFundAddressFromManager(environment);
    return Promise.all(addresses.map(fn) || []);
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

  const fundTotalSupply = new DataLoader(async addresses => {
    const settings = await fundSettings.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { sharesAddress } = settings[key] || {
          sharesAddress: null,
        };

        return sharesAddress && getFundTotalSupply(environment, sharesAddress);
      }),
    );
  });

  const fundInception = new DataLoader(addresses => {
    const fn = getFundInception(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundModules = new DataLoader(addresses => {
    const fn = getFundModules(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundCalculations = new DataLoader(async addresses => {
    const settings = await fundSettings.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { accountingAddress } = settings[key] || {
          accountingAddress: null,
        };

        return (
          accountingAddress &&
          getFundCalculations(environment, accountingAddress)
        );
      }),
    );
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
    async pairs => {
      const funds = pairs.map(pair => pair.fund);
      const investors = pairs.map(pair => pair.investor);
      const settings = await fundSettings.loadMany(funds);
      return Promise.all(
        investors.map((investor, key) => {
          const { sharesAddress } = settings[key] || {
            sharesAddress: null,
          };

          return (
            sharesAddress &&
            getFundParticipation(environment, sharesAddress, investor)
          );
        }),
      );
    },
    {
      cacheKeyFn: pair => `${pair.fund}:${pair.investor}`,
    },
  );

  const stepFor = new DataLoader(addresses => {
    const fn = getStepFor(environment);
    return Promise.all(addresses.map(fn) || []);
  });

  const symbolBalance = new DataLoader(
    async pairs => {
      const fn = getSymbolBalance(environment);
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

  const assetPrice = new DataLoader(
    tokens => {
      const fn = getAssetPrice(environment);
      return Promise.all(tokens.map(fn) || []);
    },
    {
      cacheKeyFn: token => `${token.symbol}`,
    },
  );

  let memoizedQuoteToken;
  const quoteToken = async () => {
    if (typeof memoizedQuoteToken !== 'undefined') {
      return memoizedQuoteToken;
    }

    memoizedQuoteToken = await getQuoteToken(
      environment,
      environment.deployment.priceSource,
    );
    return memoizedQuoteToken;
  };

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
    stepFor,
    assetPrice,
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
