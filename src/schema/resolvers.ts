import * as R from 'ramda';
import * as Rx from 'rxjs';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { map, pluck, distinctUntilChanged, skip } from 'rxjs/operators';
import * as protocol from '@melonproject/protocol';
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
    defaultAccount: async (_, __, { environment }) => {
      // TODO: Load wallet from keytar
      return null;
    },
    openOrders: async (_, { address }, { loaders }) => {
      const contract = await loaders.fundContract.load(address);
      return loaders.fundOpenOrders.load(contract);
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
      return takeLast(streams.priceFeed$);
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
    fund: async (_, { address }, { loaders }) => {
      return loaders.fundContract.load(address);
    },
    fundByName: async (_, { name }, { loaders, streams }) => {
      const rankings = (await takeLast(streams.ranking$)) || [];
      const fund = rankings.find(fund => fund.name === name);
      return fund && loaders.fundContract.load(fund.address);
    },
    associatedFund: async (_, { managerAddress, contractAddress }, { loaders }) => {
      const fundAddress = await loaders.fundAddressFromManager.load({
        managerAddress,
        contractAddress
      });
      return fundAddress || null;
    },
    funds: async (_, args, { loaders, streams }) => {
      const addresses = await (args.addresses ||
        ((await takeLast(streams.ranking$)) || []).map(fund => fund.address) ||
        []);

      return loaders.fundContract.loadMany(addresses);
    },
    price: (_, { symbol }, { loaders }) => {
      return loaders.symbolPrice.load(symbol);
    },
    balance: (_, { address, symbol }, { loaders }) => {
      return loaders.symbolBalance.load({ address, symbol });
    },
  },
  Ranking: {
    fund: (parent, _, { loaders }) => {
      return loaders.fundContract.load(parent.address);
    },
  },
  Fund: {
    address: parent => {
      return parent.instance.address;
    },
    rank: async (parent, _, { streams }) => {
      return takeLast(streams.ranking$).then(ranking => {
        const address = parent.instance.address;
        const entry = (ranking || []).find(rank => rank.address === address);
        return (entry && entry.rank) || null;
      });
    },
    name: (parent, _, { loaders }) => {
      return loaders.fundName.load(parent);
    },
    modules: (parent, _, { loaders }) => {
      return loaders.fundModules.load(parent);
    },
    inception: async (parent, _, { loaders }) => {
      const inception = await loaders.fundInception.load(parent);
      return new Date(inception.toString() * 1000);
    },
    owner: (parent, _, { loaders }) => {
      return loaders.fundOwner.load(parent);
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
      return calculations[0].div(10 ** precision);
    },
    managementReward: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[1].div(10 ** precision);
    },
    performanceReward: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[2].div(10 ** precision);
    },
    unclaimedRewards: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[3].div(10 ** precision);
    },
    rewardsShareQuantity: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[4].div(10 ** precision);
    },
    nav: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[5].div(10 ** precision);
    },
    sharePrice: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[6].div(10 ** precision);
    },
    totalSupply: async (parent, _, { loaders, precision = 18 }) => {
      const totalSupply = await loaders.fundTotalSupply.load(parent);
      return totalSupply.div(10 ** precision);
    },
    subscriptionAllowed: () => {
      // TODO: Where does this come from?
      throw new Error('This is not implemented yet');
    },
    redemptionAllowed: () => {
      // TODO: Where does this come from?
      throw new Error('This is not implemented yet');
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

      const contract = await loaders.fundContract.load(parent.fund);
      const calculations = await loaders.fundCalculations.load(contract);
      const nav = calculations[5].div(10 ** precision);
      return nav.div(parent.balance.times(parent.price));
    },
  },
  Mutation: {
    cancelOpenOrder: () => {
      // TODO: Cancel open orders.
      throw new Error('This is not implemented yet');
    },
    estimateSetupFund: async (_, { name, exchanges }) => {
      const createComponentsEstimation = await protocol.factory.createComponents.prepare(
        addressBook.fundFactory,
        {
          defaultTokens: addressBook.tokens,
          exchangeConfigs: addressBook.exchangeConfigs,
          fundName: name,
          priceSource: addressBook.priceSource,
          quoteToken: addressBook.tokens[0],
        },
      );
      const continueCreationEstimation = await protocol.factory.continueCreation.prepare(
        addressBook.fundFactory,
      );
      const setupFundEstimation = await protocol.factory.setupFund.prepare(
        addressBook.fundFactory,
      );

      return [
        createComponentsEstimation,
        continueCreationEstimation,
        setupFundEstimation,
      ];
      // throw new Error('This is not implemented yet');
    },
    executeSetupFund: async (_, { name, exchanges, gasLimits, gasPrice }) => {
      // TODO: Execute setup fund.
      throw new Error('This is not implemented yet');
    },
    loginWallet: (_, { password }, { loaders }) => {
      // TODO: Load wallet from keytar storage.
      throw new Error('This is not implemented yet');

      const wallet = null;
      return loaders.importWallet(wallet, password, (decrypted, encrypted) => {
        // TODO: Store encrypted wallet in keytar storage and save current
        // decrypted wallet and private key in memory.
        throw new Error('This is not implemented yet');
      });
    },
    exportWallet: (_, { password }, { loaders }) => {
      // TODO: Load decrypted wallet from memory.
      throw new Error('This is not implemented yet');
    },
    importWallet: (_, { wallet, password }, { loaders }) => {
      return loaders.importWallet(wallet, password, (decrypted, encrypted) => {
        // TODO: Store encrypted wallet in keytar storage and save current
        // decrypted wallet and private key in memory.
        throw new Error('This is not implemented yet');
      });
    },
    restoreWallet: (_, { mnemonic, password }, { loaders }) => {
      return loaders.restoreWallet(
        mnemonic,
        password,
        (decrypted, encrypted) => {
          // TODO: Store encrypted wallet in keytar storage and save current
          // decrypted wallet and private key in memory.
          throw new Error('This is not implemented yet');
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
        const stream$ = streams.priceFeed$.pipe(
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
