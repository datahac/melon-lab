import DataLoader from 'dataloader';
import Utils from 'ethers-utils';
import {
  getHoldingsAndPrices,
  getFundContract,
  getPrice,
  getBalance,
  getParticipation,
  toReadable,
  getFundForManager,
} from '@melonproject/melon.js';

export default context => {
  const contractAddressCacheKey = contract => {
    return contract.instance.address;
  };

  const fundRankings = () => {
    return new Promise((resolve, reject) => {
      context.currentRanking$.take(1).subscribe(resolve, reject);
    });
  };

  const usersFund = async address => {
    return getFundForManager(context.environment, {
      managerAddress: address,
    });
  };

  const fundContract = new DataLoader(async addresses => {
    return addresses.map(address => {
      return getFundContract(context.environment, address);
    });
  });

  const fundRanking = new DataLoader(async contracts => {
    const rankings = await fundRankings();

    return Promise.all(
      contracts.map(contract => {
        const address = contract.instance.address;
        return rankings.find(rank => rank.address === address);
      }),
    );
  });

  const fundName = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(async contract => {
          const bytes = await contract.instance.getName.call();
          return Utils.toUtf8String(
            Utils.stripZeros(bytes.reverse()).reverse(),
          );
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const fundInception = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(contract => {
          return contract.instance.getCreationTime.call();
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const fundModules = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(contract => {
          return contract.instance.getModules.call();
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const fundOwner = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(contract => {
          return contract.instance.owner.call();
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const symbolPrice = new DataLoader(async symbols => {
    return Promise.all(
      symbols.map(symbol => {
        return getPrice(symbol);
      }),
    );
  });

  const fundTotalSupply = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(contract => {
          return contract.instance.totalSupply.call();
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const fundCalculations = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(contract => {
          return contract.instance.performCalculations.call();
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const fundHoldings = new DataLoader(
    async contracts => {
      return Promise.all(
        contracts.map(async contract => {
          const address = contract.instance.address;
          return (
            (await getHoldingsAndPrices(context.environment, {
              fundAddress: address,
            })) || []
          ).map(holding => ({
            ...holding,
            fund: address,
          }));
        }),
      );
    },
    {
      cacheKeyFn: contractAddressCacheKey,
    },
  );

  const fundParticipation = new DataLoader(async pairs => {
    const { environment } = context;

    return Promise.all(
      pairs.map(async pair => {
        const { fund, investor } = pair;

        return getParticipation(environment, {
          fundAddress: fund.instance.address,
          investorAddress: investor,
        });
      }),
    );
  });

  const etherBalanceUncached = async (address) => {
    const { config, environment } = context;
    const api = environment.api.eth;
    const balance = await api.getBalance(address);
    return toReadable(config, balance, config.nativeAssetSymbol);
  };

  const etherBalance = new DataLoader(async addresses => {
    return Promise.all(addresses.map(etherBalanceUncached));
  });

  const melonBalanceUncached = (address) => {
    const { config, environment } = context;
    return getBalance(environment, {
      tokenSymbol: config.melonAssetSymbol,
      ofAddress: address,
    });
  };

  const melonBalance = new DataLoader(async addresses => {
    return Promise.all(addresses.map(melonBalanceUncached));
  });

  const nativeBalanceUncached = (address) => {
    const { config, environment } = context;
    return getBalance(environment, {
      tokenSymbol: config.nativeAssetSymbol,
      ofAddress: address,
    });
  };

  const nativeBalance = new DataLoader(async addresses => {
    return Promise.all(addresses.map(nativeBalanceUncached));
  });

  const currentBlock = () => {
    return new Promise((resolve, reject) => {
      context.currentBlock$.take(1).subscribe(resolve, reject);
    });
  };

  return {
    fundRankings,
    fundRanking,
    fundContract,
    fundName,
    fundInception,
    fundModules,
    fundOwner,
    fundTotalSupply,
    fundCalculations,
    fundHoldings,
    fundParticipation,
    symbolPrice,
    nativeBalance,
    nativeBalanceUncached,
    melonBalance,
    melonBalanceUncached,
    etherBalance,
    etherBalanceUncached,
    currentBlock,
    usersFund,
  };
};
