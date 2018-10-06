import DataLoader from 'dataloader';
import Utils from 'ethers-utils';
import takeLast from './utils/takeLast';
import {
  getHoldingsAndPrices,
  getFundContract,
  getPrice,
  getBalance,
  getParticipation,
  getFundForManager,
  getRecentTrades,
  getOpenOrders,
  createWallet,
  toReadable,
} from '@melonproject/melon.js';

const contractCache = contract => contract.instance.address;

export default async (streams) => {
  const usersFund = async (address) => {
    const environment = await takeLast(streams.environment$);
    const fund = environment && await getFundForManager(environment, {
      managerAddress: address,
    });

    return fund || null;
  };

  const fundContract = new DataLoader(
    async (addresses) => {
      const environment = await takeLast(streams.environment$);

      return environment && addresses.map((address) => {
        return getFundContract(environment, address);
      });
    },
  );

  const fundName = new DataLoader(
    async (contracts) => Promise.all(contracts.map(async (contract) => {
      const bytes = await contract.instance.getName.call();

      return Utils.toUtf8String(
        Utils.stripZeros(bytes.reverse()).reverse(),
      );
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundInception = new DataLoader(
    async (contracts) => Promise.all(contracts.map(contract => {
      return contract.instance.getCreationTime.call();
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundModules = new DataLoader(
    async (contracts) => Promise.all(contracts.map(contract => {
      return contract.instance.getModules.call();
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundOwner = new DataLoader(
    async (contracts) => Promise.all(contracts.map(contract => {
      return contract.instance.owner.call();
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const symbolPrice = new DataLoader(
    async (symbols) => Promise.all(symbols.map(symbol => {
      return getPrice(symbol);
    })),
  );

  const fundTotalSupply = new DataLoader(
    async (contracts) => Promise.all(contracts.map(contract => {
      return contract.instance.totalSupply.call();
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundCalculations = new DataLoader(
    async (contracts) => Promise.all(contracts.map(contract => {
      return contract.instance.performCalculations.call();
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundHoldings = new DataLoader(
    async (contracts) => Promise.all(contracts.map(async contract => {
      const address = contract.instance.address;
      const environment = await takeLast(streams.environment$);
      const holdings = await getHoldingsAndPrices(environment, {
        fundAddress: address,
      }) || [];

      return holdings.map(holding => ({
        ...holding,
        fund: address,
      }));
    })),
    {
      cacheKeyFn: contractCache,
    },
  );

  const fundOpenOrders = new DataLoader(
    async (contracts) => Promise.all(contracts.map(async (contract) => {
      const address = contract.instance.address;
      const environment = await takeLast(streams.environment$);
      const config = await takeLast(streams.config$);
      const orders = environment && await getOpenOrders(environment, {
        fundAddress: address,
      }) || [];
      
      return orders.map((order) => ({
        id: order.exchangeOrderId,
        isActive: true,
        exchange: 'OASIS_DEX',
        exchangeContractAddress: config && config.matchingMarketAddress,
        type: order.type,
        price: order.price,
        buy: {
          symbol: order.buySymbol,
          howMuch: order.buyHowMuch,
        },
        sell: {
          symbol: order.sellSymbol,
          howMuch: order.sellHowMuch,
        },
        timestamp: order.timestamp,
      }));
    })),
    {
      cacheKeyFn: contractCache,
    }
  );

  const fundParticipation = new DataLoader(
    async (pairs) => {
      const environment = await takeLast(streams.environment$);

      return Promise.all(pairs.map(async pair => {
        return environment && getParticipation(environment, {
          fundAddress: pair.fund.instance.address,
          investorAddress: pair.investor,
        });
      }));
    },
  );

  const etherBalanceUncached = async (address) => {
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const symbol = config && config.nativeAssetSymbol;
    const balance = environment && await environment.api.eth.getBalance(address);

    return balance && symbol && toReadable(config, balance, symbol);
  };

  const etherBalance = new DataLoader(
    async (addresses) => Promise.all(addresses.map(etherBalanceUncached)),
  );

  const melonBalanceUncached = async (address) => {
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const symbol = config && config.melonAssetSymbol;

    return environment && symbol && getBalance(environment, {
      tokenSymbol: symbol,
      ofAddress: address,
    });
  };

  const melonBalance = new DataLoader(
    async (addresses) => Promise.all(addresses.map(melonBalanceUncached)),
  );

  const nativeBalanceUncached = async (address) => {
    const environment = await takeLast(streams.environment$);
    const config = await takeLast(streams.config$);
    const symbol = config && config.nativeAssetSymbol;

    return environment && symbol && getBalance(environment, {
      tokenSymbol: symbol,
      ofAddress: address,
    });
  };

  const nativeBalance = new DataLoader(
    async (addresses) => Promise.all(addresses.map(nativeBalanceUncached)),
  );
  
  const recentTrades = new DataLoader(
    async (pairs) => {
      const environment = await takeLast(streams.environment$);

      return Promise.all(pairs.map(async pair => {
        return environment && await getRecentTrades(environment, {
          baseTokenSymbol: pair.baseTokenSymbol,
          quoteTokenSymbol: pair.quoteTokenSymbol,
        });
      }));
    },
  );

  const generateMnemonic = async () => {
    const wallet = await createWallet();
    return wallet && wallet.mnemonic;
  };  

  return {
    takeLast,
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
    nativeBalanceUncached,
    melonBalance,
    melonBalanceUncached,
    etherBalance,
    etherBalanceUncached,
    usersFund,
    generateMnemonic,
  };
};
