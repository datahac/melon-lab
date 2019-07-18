import DataLoader from 'dataloader';
import memoizeOne from 'memoize-one';
import * as R from 'ramda';
import { map, pluck, share } from 'rxjs/operators';
import getAssetPrice from './loaders/assetPrice';
import getExchangeOrders from './loaders/exchangeOrders';
import getExchangeOrdersObservable from './loaders/exchangeOrdersObservable';
import getFundAddressFromManager from './loaders/fund/fundAddressFromManager';
import getFundCalculations from './loaders/fund/fundCalculations';
import getFundDenominationAsset from './loaders/fund/fundDenominationAsset';
import getFundHoldings from './loaders/fund/fundHoldings';
import getFundInception from './loaders/fund/fundInception';
import getFundIsComplete from './loaders/fund/fundIsComplete';
import getHasActiveRequest from './loaders/hasActiveRequest';
import getFundIsShutdown from './loaders/fund/fundIsShutdown';
import getFundName from './loaders/fund/fundName';
import getFundManagementFee from './loaders/fund/fundManagementFee';
import getFundPerformanceFee from './loaders/fund/fundPerformanceFee';
import getFundSharePrice from './loaders/fund/fundSharePrice';
import getFundNativeAsset from './loaders/fund/fundNativeAsset';
import getFundOwner from './loaders/fund/fundOwner';
import getFundParticipation from './loaders/fund/fundParticipation';
import getInvestAllowed from './loaders/fund/fundInvestAllowed';
import getFundPolicies from './loaders/fund/fundPolicies';
import getFundRoutes from './loaders/fund/fundRoutes';
import getFundRemainingInvestAmount from './loaders/fund/fundRemainingInvestAmount';
import getFundTotalSupply from './loaders/fund/fundTotalSupply';
import getFundAllowedExchanges from './loaders/fund/fundAllowedExchanges';
import getQuoteToken from './loaders/quoteToken';
import getRoutes from './loaders/routes';
import getSymbolBalance from './loaders/symbolBalance';
import getSymbolBalanceObservable from './loaders/symbolBalanceObservable';
import importWallet from './loaders/wallet/decryptWallet';
import generateMnemonic from './loaders/wallet/generateMnemonic';
import restoreWallet from './loaders/wallet/restoreWallet';
import resolveNetwork from './utils/resolveNetwork';
import takeLast from './utils/takeLast';
import { getTokenBySymbol, getLastUpdate } from '@melonproject/protocol';

export default (environment$, streams) => {
  const environment = memoizeOne(async () => {
    return takeLast(environment$);
  });

  const fundIsComplete = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundIsComplete(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundAllowedExchanges = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);

    return Promise.all(
      addresses.map((address, key) => {
        const { tradingAddress } = routes[key] || {
          tradingAddress: null,
        };

        return tradingAddress && getFundAllowedExchanges(env, tradingAddress);
      }),
    );
  });

  const fundInvestAllowed = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getInvestAllowed(env, await tokens());
    const routes = await fundRoutes.loadMany(addresses);

    return Promise.all(
      addresses.map((address, key) => {
        const { participationAddress } = routes[key] || {
          participationAddress: null,
        };

        return participationAddress && fn(participationAddress);
      }),
    );
  });

  const fundRemainingInvestAmount = new DataLoader(async pairs => {
    const env = await environment();
    const addresses = pairs.map(pair => pair.fund);
    const assets = pairs
      .map(pair => pair.asset)
      .map(asset => {
        return getTokenBySymbol(env, asset);
      });

    const daiToken = getTokenBySymbol(env, 'DAI');
    if (!daiToken) {
      throw new Error('Missing DAI token.');
    }

    const dai = await assetPrice.load(daiToken);
    const calculations = await fundCalculations.loadMany(addresses);
    const prices = await assetPrice.loadMany(assets);
    const fn = getFundRemainingInvestAmount(dai);

    return Promise.all(
      pairs.map((pair, key) => {
        const price = prices[key];
        const { gav } = calculations[key] || {
          gav: null,
        };

        return gav && price && fn(price, gav);
      }),
    );
  });

  const fundPolicies = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);

    return Promise.all(
      addresses.map((address, key) => {
        const { policyManagerAddress } = routes[key] || {
          policyManagerAddress: null,
        };

        return (
          policyManagerAddress && getFundPolicies(env, policyManagerAddress)
        );
      }),
    );
  });

  const fundAddressFromManager = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundAddressFromManager(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const routes = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getRoutes(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundName = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundName(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundSharePrice = new DataLoader(async pairs => {
    const env = await environment();
    const funds = pairs.map(pair => pair.fund);
    const routes = await fundRoutes.loadMany(funds);

    const fn = getFundSharePrice(env);
    return Promise.all(
      pairs.map((pair, key) => {
        const { sharesAddress, accountingAddress } = routes[key];

        return fn(sharesAddress, accountingAddress, pair.asset);
      }) || [],
    );
  });

  const fundDenominationAsset = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { accountingAddress } = routes[key] || {
          accountingAddress: null,
        };

        return (
          accountingAddress && getFundDenominationAsset(env, accountingAddress)
        );
      }),
    );
  });

  const fundNativeAsset = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { accountingAddress } = routes[key] || {
          accountingAddress: null,
        };

        return accountingAddress && getFundNativeAsset(env, accountingAddress);
      }),
    );
  });

  const fundReady = new DataLoader(async addresses => {
    const routes = await fundRoutes.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        return !!(routes && routes[key]);
      }),
    );
  });

  const fundOwner = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundOwner(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundRoutes = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundRoutes(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundTotalSupply = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { sharesAddress } = routes[key] || {
          sharesAddress: null,
        };

        return sharesAddress && getFundTotalSupply(env, sharesAddress);
      }),
    );
  });

  const fundRank = new DataLoader(async addresses => {
    const ranking = (await takeLast(streams.ranking$)) || [];
    return Promise.all(
      addresses.map(address => {
        const entry = R.find(R.propEq('address', address), ranking);
        return R.propOr(0, 'rank', entry);
      }),
    );
  });

  const fundInception = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundInception(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundCalculations = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { accountingAddress } = routes[key] || {
          accountingAddress: null,
        };

        return accountingAddress && getFundCalculations(env, accountingAddress);
      }),
    );
  });

  const fundHoldings = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    return Promise.all(
      addresses.map((address, key) => {
        const { accountingAddress, tradingAddress } = routes[key] || {
          accountingAddress: null,
          tradingAddress: null,
        };

        return (
          accountingAddress &&
          tradingAddress &&
          getFundHoldings(env, accountingAddress, tradingAddress)
        );
      }),
    );
  });

  const fundIsShutdown = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getFundIsShutdown(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const fundParticipation = new DataLoader(
    async pairs => {
      const env = await environment();
      const funds = pairs.map(pair => pair.fund);
      const investors = pairs.map(pair => pair.investor);
      const routes = await fundRoutes.loadMany(funds);
      return Promise.all(
        investors.map((investor, key) => {
          const { sharesAddress } = routes[key] || {
            sharesAddress: null,
          };

          return (
            sharesAddress && getFundParticipation(env, sharesAddress, investor)
          );
        }),
      );
    },
    {
      cacheKeyFn: pair => `${pair.fund}:${pair.investor}`,
    },
  );

  const fundManagementFee = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    const fn = getFundManagementFee(env);
    return Promise.all(
      addresses.map((_, key) => {
        const { feeManagerAddress: address } = routes[key] || {
          feeManagerAddress: null,
        };

        return address && fn(address);
      }),
    );
  });

  const fundPerformanceFee = new DataLoader(async addresses => {
    const env = await environment();
    const routes = await fundRoutes.loadMany(addresses);
    const fn = getFundPerformanceFee(env);
    return Promise.all(
      addresses.map((_, key) => {
        const { feeManagerAddress: address } = routes[key] || {
          feeManagerAddress: null,
        };

        return address && fn(address);
      }),
    );
  });

  const fundByName = new DataLoader(async names => {
    const ranking = await fundRanking();
    return Promise.all(
      names.map(name => {
        const entry = R.find(R.propEq('name', name), ranking);
        return R.prop('address', entry);
      }),
    );
  });

  const fundRanking = memoizeOne(() => {
    return takeLast(streams.ranking$);
  });

  const hasActiveRequest = new DataLoader(async addresses => {
    const env = await environment();
    const fn = getHasActiveRequest(env);
    return Promise.all(addresses.map(fn) || []);
  });

  const symbolBalance = new DataLoader(
    async pairs => {
      const env = await environment();
      const fn = getSymbolBalance(env);
      const result = pairs.map(pair => fn(pair.symbol, pair.address));
      return Promise.all(result || []);
    },
    {
      cacheKeyFn: pair => `${pair.symbol}:${pair.address}`,
    },
  );

  const symbolBalanceObservable = new DataLoader(
    async pairs => {
      const env = await environment();
      const fn = getSymbolBalanceObservable(env, streams);
      const result = pairs.map(pair => {
        const stream$ = fn(pair.symbol, pair.address);
        return stream$.pipe(share());
      });

      return Promise.all(result || []);
    },
    {
      cacheKeyFn: pair => `${pair.symbol}:${pair.address}`,
    },
  );

  const assetPrice = new DataLoader(
    async tokens => {
      const env = await environment();
      const fn = getAssetPrice(env);
      return Promise.all(tokens.map(fn) || []);
    },
    {
      cacheKeyFn: token => `${token.symbol}`,
    },
  );

  const exchangeOrders = new DataLoader(
    async pairs => {
      const env = await environment();
      const fn = getExchangeOrders(env);
      const result = pairs.map(pair =>
        fn(pair.exchange, pair.base, pair.quote),
      );
      const raw = await Promise.all(result || []);
      return raw;
    },
    {
      cacheKeyFn: options =>
        `${options.exchange}:${options.base}:${options.quote}`,
    },
  );

  const exchangeOrdersObservable = new DataLoader(
    async pairs => {
      const env = await environment();
      const fn = getExchangeOrdersObservable(env);
      const result = pairs.map(async pair => {
        const stream$ = await fn(pair.exchange, pair.base, pair.quote);
        return stream$.pipe(share());
      });

      return Promise.all(result || []);
    },
    {
      cacheKeyFn: pair => `${pair.exchange}:${pair.base}:${pair.quote}`,
    },
  );

  const quoteToken = memoizeOne(async () => {
    const env = await environment();

    return getQuoteToken(env, env.deployment.melonContracts.priceSource);
  });

  const currentBlock = memoizeOne(() => {
    return takeLast(streams.block$.pipe(pluck('number')));
  });

  const nodeSynced = memoizeOne(() => {
    return takeLast(streams.syncing$.pipe(map(value => !value)));
  });

  const priceFeedUp = memoizeOne(() => {
    return takeLast(streams.recentPrice$);
  });

  const peerCount = memoizeOne(() => {
    return takeLast(streams.peers$);
  });

  const versionDeployment = memoizeOne(async () => {
    const env = await environment();
    return env.deployment;
  });

  const networkName = memoizeOne(async () => {
    const env = await environment();
    return resolveNetwork(await env.eth.net.getId());
  });

  const tokens = memoizeOne(async () => {
    const env = await environment();
    return env.deployment.thirdPartyContracts.tokens;
  });

  const priceFeedUpdate = memoizeOne(async () => {
    const env = await environment();
    return await getLastUpdate(env, env.deployment.melonContracts.priceSource);
  });

  return {
    environment,
    assetPrice,
    currentBlock,
    hasActiveRequest,
    fundAddressFromManager,
    fundRemainingInvestAmount,
    fundByName,
    fundCalculations,
    fundHoldings,
    fundInception,
    fundIsShutdown,
    fundName,
    fundSharePrice,
    fundNativeAsset,
    fundOwner,
    fundParticipation,
    fundDenominationAsset,
    fundManagementFee,
    fundPerformanceFee,
    fundAllowedExchanges,
    fundInvestAllowed,
    fundRank,
    fundRanking,
    fundReady,
    fundRoutes,
    fundTotalSupply,
    fundPolicies,
    generateMnemonic,
    importWallet,
    networkName,
    nodeSynced,
    peerCount,
    priceFeedUp,
    quoteToken,
    restoreWallet,
    symbolBalance,
    symbolBalanceObservable,
    versionDeployment,
    fundIsComplete,
    routes,
    exchangeOrders,
    exchangeOrdersObservable,
    tokens,
    priceFeedUpdate,
  };
};
