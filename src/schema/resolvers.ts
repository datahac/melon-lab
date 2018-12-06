import * as R from 'ramda';
import * as Rx from 'rxjs';
import * as keytar from 'keytar';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { map, pluck, distinctUntilChanged, skip } from 'rxjs/operators';
import { createComponents } from '@melonproject/protocol/lib/contracts/factory/transactions/createComponents';
import { continueCreation } from '@melonproject/protocol/lib/contracts/factory/transactions/continueCreation';
import { setupFund } from '@melonproject/protocol/lib/contracts/factory/transactions/setupFund';
import { requestInvestment } from '@melonproject/protocol/lib/contracts/fund/participation/transactions/requestInvestment';
import { approve as approveTransfer } from '@melonproject/protocol/lib/contracts/dependencies/token/transactions/approve';
import { Address } from '@melonproject/token-math/address';
import { createQuantity } from '@melonproject/token-math/quantity';
import Order from './types/Order';
import toAsyncIterator from './utils/toAsyncIterator';
import takeLast from './utils/takeLast';
import resolveNetwork from './utils/resolveNetwork';
import sameBlock from './utils/sameBlock';

export default {
  DateTime,
  Json: GraphQLJSON,
  Order,
  Query: {
    hasStoredWallet: async () => {
      const credentials = await keytar.findCredentials('melon.fund');
      return !!(credentials && credentials.length);
    },
    defaultAccount: async (_, __, { loaders }) => {
      const wallet = loaders.getWallet();
      return wallet && wallet.address;
    },
    allAccounts: async (_, __, { loaders }) => {
      // TODO: Make this return all accounts.
      const wallet = loaders.getWallet();
      return wallet && wallet.address && [wallet.address];
    },
    openOrders: async (_, { address }, { loaders }) => {
      return loaders.fundOpenOrders.load(address);
    },
    recentTrades: (_, { base, quote }, { loaders }) => {
      return loaders.recentTrades.load({ base, quote });
    },
    currentBlock: (_, __, { streams }) => {
      return takeLast(streams.block$.pipe(pluck('number')));
    },
    nodeSynced: (_, __, { streams }) => {
      return takeLast(streams.syncing$.pipe(map(value => !value)));
    },
    totalFunds: (_, __, { streams }) => {
      return takeLast(streams.ranking$);
    },
    priceFeedUp: (_, __, { streams }) => {
      return takeLast(streams.recentPrice$);
    },
    peerCount: (_, __, { streams }) => {
      return takeLast(streams.peers$);
    },
    contractDeployment: (_, __, { streams }) => {
      return takeLast(streams.deployment$);
    },
    network: (_, __, { streams }) => {
      return takeLast(streams.network$.pipe(map(resolveNetwork)));
    },
    rankings: (_, __, { streams }) => {
      return takeLast(streams.ranking$);
    },
    fund: async (_, { address }) => {
      return address;
    },
    fundByName: async (_, { name }, { loaders, streams }) => {
      const rankings = (await takeLast(streams.ranking$)) || [];
      const fund = rankings.find(fund => fund.name === name);
      return fund && fund.address;
    },
    associatedFund: async (_, { managerAddress }, { loaders, streams }) => {
      const deployment: any = await takeLast(streams.deployment$);
      const { version } = deployment;

      const fundAddress = await loaders.fundAddressFromManager.load({
        managerAddress,
        version,
      });

      return fundAddress;
    },
    funds: async (_, args, { loaders, streams }) => {
      const addresses = await (args.addresses ||
        ((await takeLast(streams.ranking$)) || []).map(fund => fund.address) ||
        []);

      return loaders.fundContract.loadMany(addresses);
    },
    balance: (_, { address, symbol }, { loaders }) => {
      return loaders.symbolBalance.load({ address, symbol });
    },
  },
  Ranking: {
    fund: (parent, _, { loaders }) => {
      return parent.address;
    },
  },
  Fund: {
    address: parent => {
      return parent;
    },
    name: (parent, _, { loaders }) => {
      return loaders.fundName.load(parent);
    },
    owner: (parent, _, { loaders }) => {
      return loaders.fundOwner.load(parent);
    },
    settings: (parent, _, { loaders }) => {
      return loaders.fundSettings.load(parent);
    },
    totalSupply: async (parent, _, { loaders }) => {
      const { sharesAddress } = await loaders.fundSettings.load(parent);
      return loaders.fundTotalSupply.load(sharesAddress);
    },
    rank: async (parent, _, { streams }) => {
      return takeLast(streams.ranking$).then(ranking => {
        const entry = (ranking || []).find(rank => rank.address === parent);
        return entry && entry.rank;
      });
    },
    modules: (parent, _, { loaders }) => {
      return loaders.fundModules.load(parent);
    },
    inception: async (parent, _, { loaders }) => {
      const inception = await loaders.fundInception.load(parent);
      return inception && new Date(inception.toString() * 1000);
    },
    personalStake: async (parent, { investor }, { loaders }) => {
      const participation = await loaders.fundParticipation.load({
        fund: parent,
        investor: investor,
      });

      return participation && participation.personalStake;
    },
    gav: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[0].div(10 ** precision);
    },
    managementReward: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[1].div(10 ** precision);
    },
    performanceReward: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[2].div(10 ** precision);
    },
    unclaimedRewards: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[3].div(10 ** precision);
    },
    rewardsShareQuantity: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[4].div(10 ** precision);
    },
    nav: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[5].div(10 ** precision);
    },
    sharePrice: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations[6].div(10 ** precision);
    },
    subscriptionAllowed: () => {
      // TODO: Where does this come from?
      return null;
    },
    redemptionAllowed: () => {
      // TODO: Where does this come from?
      return null;
    },
    holdings: (parent, _, { loaders }) => {
      return loaders.fundHoldings.load(parent);
    },
  },
  Holding: {
    symbol: parent => {
      return parent.name;
    },
    fraction: async (parent, _, { loaders, precision = 18 }) => {
      if (parent.balance.eq(0)) {
        return 0;
      }

      const calculations = await loaders.fundCalculations.load(parent.fund);
      const nav = calculations[5].div(10 ** precision);
      return nav.div(parent.balance.times(parent.price));
    },
  },
  Mutation: {
    cancelOpenOrder: () => {
      // TODO: Cancel open orders.
      throw new Error('This is not implemented yet');
    },
    estimateCreateComponents: async (
      _,
      { from, name, exchanges },
      { environment, loaders, streams },
    ) => {
      const quoteToken = await loaders.quoteToken();
      const { exchangeConfigs, priceSource, tokens, version } = await takeLast(
        streams.deployment$,
      );

      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const mlnToken = tokens.find(token => {
        return token.symbol === 'MLN';
      });

      const params = {
        defaultTokens: [quoteToken, mlnToken],
        exchangeConfigs,
        fundName: name,
        priceSource,
        quoteToken,
        nativeToken,
      };

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await createComponents.prepare(
        version,
        params,
        undefined,
        enhancedEnvironment,
      );

      return result && result.rawTransaction;
    },
    executeCreateComponents: async (
      _,
      { from, signed },
      { environment, streams },
    ) => {
      const { version } = await takeLast(streams.deployment$);

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return createComponents.send(
        version,
        signed.rawTransaction,
        undefined, // TODO: Remove params from send.
        undefined,
        enhancedEnvironment,
      );
    },
    estimateContinueCreation: async (_, { from }, { environment, streams }) => {
      const { version } = await takeLast(streams.deployment$);

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await continueCreation.prepare(
        version,
        undefined,
        undefined,
        enhancedEnvironment,
      );

      return result && result.rawTransaction;
    },
    executeContinueCreation: async (
      _,
      { from, signed },
      { environment, streams },
    ) => {
      const { version } = await takeLast(streams.deployment$);

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return continueCreation.send(
        version,
        signed.rawTransaction,
        undefined, // TODO: Remove params from send.
        undefined,
        enhancedEnvironment,
      );
    },
    estimateSetupFund: async (_, { from }, { environment, streams }) => {
      const { version } = await takeLast(streams.deployment$);

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await setupFund.prepare(
        version,
        undefined,
        undefined,
        enhancedEnvironment,
      );

      return result && result.rawTransaction;
    },
    executeSetupFund: async (_, { from, signed }, { environment, streams }) => {
      const deployment: any = await takeLast(streams.deployment$);
      const { version } = deployment;

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return setupFund.send(
        version,
        signed.rawTransaction,
        undefined, // TODO: Remove params from send.
        undefined,
        enhancedEnvironment,
      );
    },
    estimateRequestInvestment: async (
      _,
      { from, fundAddress, investmentAmount },
      { environment, streams, loaders },
    ) => {
      const { tokens } = await takeLast(streams.deployment$);
      const settings = await loaders.fundSettings.load(fundAddress);
      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const params = {
        investmentAmount: createQuantity(weth, investmentAmount),
      };

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await requestInvestment.prepare(
        settings.participationAddress,
        params,
        undefined,
        enhancedEnvironment,
      );

      return result && result.rawTransaction;
    },
    executeRequestInvestment: async (
      _,
      { from, signed, fundAddress },
      { environment, loaders },
    ) => {
      const settings = await loaders.fundSettings.load(fundAddress);
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return requestInvestment.send(
        settings.participationAddress,
        signed.rawTransaction,
        undefined, // TODO: Remove params from send.
        undefined,
        enhancedEnvironment,
      );
    },
    estimateApproveTransfer: async (
      _,
      { from, fundAddress, investmentAmount },
      { environment, streams, loaders },
    ) => {
      const quoteToken = await loaders.quoteToken();
      const settings = await loaders.fundSettings.load(fundAddress);
      const params = {
        howMuch: createQuantity(quoteToken, investmentAmount),
        spender: settings.participationAddress,
      };

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await approveTransfer.prepare(
        params,
        undefined,
        enhancedEnvironment,
      );

      return result && result.rawTransaction;
    },
    executeApproveTransfer: async (
      _,
      { from, signed, fundAddress },
      { environment, loaders },
    ) => {
      const settings = await loaders.fundSettings.load(fundAddress);

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return requestInvestment.send(
        settings.participationAddress,
        signed.rawTransaction,
        undefined, // TODO: Remove params from send.
        undefined,
        enhancedEnvironment,
      );
    },
    deleteWallet: async () => {
      const credentials = (await keytar.findCredentials('melon.fund')) || [];
      credentials.forEach(item => {
        keytar.deletePassword('melon.fund', item.account);
      });

      return true;
    },
    loginWallet: async (_, { password }, { loaders }) => {
      const credentials = await keytar.findCredentials('melon.fund');
      if (credentials && credentials.length) {
        const item = R.head(credentials);
        return loaders.importWallet(item.password, password, decrypted => {
          loaders.setWallet(decrypted);
        });
      }

      return null;
    },
    exportWallet: (_, { password }, { loaders }) => {
      const wallet = loaders.getWallet();
      return wallet && wallet.encrypt(password);
    },
    importWallet: (_, { wallet, password }, { loaders }) => {
      return loaders.importWallet(
        wallet,
        password,
        async (decrypted, encrypted) => {
          // Currently, we only support a single stored wallet.
          const credentials =
            (await keytar.findCredentials('melon.fund')) || [];
          credentials.forEach(item => {
            keytar.deletePassword('melon.fund', item.account);
          });

          await keytar.setPassword('melon.fund', decrypted.address, encrypted);
          loaders.setWallet(decrypted);
        },
      );
    },
    restoreWallet: (_, { mnemonic, password }, { loaders }) => {
      return loaders.restoreWallet(
        mnemonic,
        password,
        async (decrypted, encrypted) => {
          await keytar.setPassword('melon.fund', decrypted.address, encrypted);
          loaders.setWallet(decrypted);
        },
      );
    },
    generateMnemonic: (_, __, { loaders }) => {
      return loaders.generateMnemonic();
    },
  },
  Subscription: {
    orderbook: {
      resolve: value => value,
      subscribe: () => {
        const stream$ = Rx.empty();
        return toAsyncIterator(stream$);
      },
    },
    balance: {
      resolve: value => value,
      subscribe: async (_, { symbol, address }, { loaders }) => {
        const stream$ = (await loaders.symbolBalanceObservable(
          symbol,
          address,
        )).pipe(distinctUntilChanged(R.equals));

        return toAsyncIterator(stream$);
      },
    },
    currentBlock: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.block$.pipe(
          pluck('number'),
          distinctUntilChanged(sameBlock),
          skip(1),
        );

        return toAsyncIterator(stream$);
      },
    },
    nodeSynced: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.syncing$.pipe(
          map(state => !state),
          distinctUntilChanged(R.equals),
          skip(1),
        );

        return toAsyncIterator(stream$);
      },
    },
    priceFeedUp: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.recentPrice$.pipe(
          distinctUntilChanged(R.equals),
          skip(1),
        );

        return toAsyncIterator(stream$);
      },
    },
    peerCount: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.peers$.pipe(
          distinctUntilChanged(R.equals),
          skip(1),
        );

        return toAsyncIterator(stream$);
      },
    },
    network: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.network$.pipe(
          distinctUntilChanged(R.equals),
          skip(1),
        );

        return toAsyncIterator(stream$);
      },
    },
  },
};
