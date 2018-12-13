import * as R from 'ramda';
import * as Rx from 'rxjs';
import * as keytar from 'keytar';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import { map, pluck, distinctUntilChanged, skip } from 'rxjs/operators';
import {
  createComponents,
  continueCreation,
  setupFund,
  requestInvestment,
  executeRequest,
  approve as approveTransfer,
  isEmptyAddress,
  isAddress,
} from '@melonproject/protocol';
import { getTokenByAddress } from '@melonproject/protocol/lib/utils/environment/getTokenByAddress';
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
    defaultAccount: (_, __, { loaders }) => {
      const wallet = loaders.getWallet();
      return wallet && wallet.address;
    },
    allAccounts: (_, __, { loaders }) => {
      // TODO: Make this return all accounts.
      const wallet = loaders.getWallet();
      return wallet && wallet.address && [wallet.address];
    },
    stepFor: (_, { address }, { loaders }) => {
      return loaders.stepFor.load(address);
    },
    openOrders: (_, { address }, { loaders }) => {
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
      return takeLast(streams.ranking$.pipe(map(value => value.length)));
    },
    priceFeedUp: (_, __, { streams }) => {
      return takeLast(streams.recentPrice$);
    },
    peerCount: (_, __, { streams }) => {
      return takeLast(streams.peers$);
    },
    contractDeployment: (_, __, { environment }) => {
      return environment.deployment;
    },
    network: async (_, __, { environment }) => {
      return resolveNetwork(await environment.eth.net.getId());
    },
    rankings: (_, __, { streams }) => {
      return takeLast(streams.ranking$);
    },
    fund: (_, { address }) => {
      return address;
    },
    fundByName: async (_, { name }, { streams }) => {
      const rankings = (await takeLast(streams.ranking$)) || [];
      const fund = rankings.find(fund => fund.name === name);
      return fund && fund.address;
    },
    associatedFund: async (_, { managerAddress }, { loaders }) => {
      const fundAddress = await loaders.fundAddressFromManager.load(
        managerAddress,
      );

      return fundAddress;
    },
    balance: (_, { address, symbol }, { loaders }) => {
      return loaders.symbolBalance.load({ address, symbol });
    },
  },
  Ranking: {
    fund: (parent, _, { loaders }) => {
      return parent.address;
    },
    rank: parent => {
      // TODO: Add the +1 on the protocol level.
      return parent.rank + 1;
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
    totalSupply: (parent, _, { loaders }) => {
      return loaders.fundTotalSupply.load(parent);
    },
    rank: async (parent, _, { streams }) => {
      const ranking = await takeLast(streams.ranking$);
      const entry = (ranking || []).find(rank => rank.address === parent);
      // TODO: Add the +1 on the protocol level.
      const result = (entry && entry.rank + 1) || 0;
      return result;
    },
    modules: (parent, _, { loaders }) => {
      return loaders.fundModules.load(parent);
    },
    inception: async (parent, _, { loaders }) => {
      return loaders.fundInception.load(parent);
    },
    personalStake: async (parent, { investor }, { loaders }) => {
      return loaders.fundParticipation.load({
        fund: parent,
        investor,
      });
    },
    gav: async (parent, _, { loaders }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations.gav;
    },
    nav: async (parent, _, { loaders }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations.nav;
    },
    sharePrice: async (parent, _, { loaders }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations && calculations.sharePrice;
    },
    managementReward: async (parent, _, { loaders }) => {
      return null;
    },
    performanceReward: async (parent, _, { loaders }) => {
      return null;
    },
    unclaimedFees: async (parent, _, { loaders }) => {
      return null;
    },
    feesShareQuantity: async (parent, _, { loaders }) => {
      return null;
    },
    holdings: async (parent, _, { loaders, environment }) => {
      const { accountingAddress } = await loaders.fundSettings.load(parent);
      const { 0: quantities, 1: tokens } = await loaders.fundHoldings.load(
        accountingAddress,
      );

      const result = tokens
        .filter(value => {
          return isAddress(value) && !isEmptyAddress(value);
        })
        .map((value, key) => {
          const token = getTokenByAddress(environment, value);
          return createQuantity(token, quantities[key]);
        });

      return result;
    },
  },
  Holding: {
    fraction: async (parent, _, { loaders }) => {
      // TODO: Re-implement this.
      return 0;
    },
    balance: parent => {
      return parent;
    },
    price: async (parent, _, { loaders }) => {
      return loaders.assetPrice.load(parent.token);
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
      { environment, loaders },
    ) => {
      const quoteToken = await loaders.quoteToken();
      const {
        exchangeConfigs,
        priceSource,
        tokens,
        version,
      } = environment.deployment;

      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const mlnToken = tokens.find(token => {
        return token.symbol === 'MLN';
      });

      const params = {
        fees: [], // TODO: Implement fees
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
        enhancedEnvironment,
        version,
        params,
      );

      return result && result.rawTransaction;
    },
    executeCreateComponents: (_, { from, signed }, { environment }) => {
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return createComponents.send(
        enhancedEnvironment,
        environment.deployment.version,
        signed.rawTransaction,
      );
    },
    estimateContinueCreation: async (_, { from }, { environment, streams }) => {
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await continueCreation.prepare(
        enhancedEnvironment,
        environment.deployment.version,
      );

      return result && result.rawTransaction;
    },
    executeContinueCreation: async (_, { from, signed }, { environment }) => {
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await continueCreation.send(
        enhancedEnvironment,
        environment.deployment.version,
        signed.rawTransaction,
      );

      return !!result;
    },
    estimateSetupFund: async (_, { from }, { environment }) => {
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await setupFund.prepare(
        enhancedEnvironment,
        environment.deployment.version,
      );

      return result && result.rawTransaction;
    },
    executeSetupFund: async (_, { from, signed }, { environment, streams }) => {
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await setupFund.send(
        enhancedEnvironment,
        environment.deployment.version,
        signed.rawTransaction,
      );

      return !!result;
    },
    estimateRequestInvestment: async (
      _,
      { from, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      const { tokens } = environment.deployment;
      const settings = await loaders.fundSettings.load(fundAddress);
      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const params = {
        investmentAmount: createQuantity(nativeToken, investmentAmount),
      };

      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await requestInvestment.prepare(
        enhancedEnvironment,
        settings.participationAddress,
        params,
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

      const result = await requestInvestment.send(
        enhancedEnvironment,
        settings.participationAddress,
        signed.rawTransaction,
      );

      return !!result;
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

      const result = await approveTransfer.prepare(enhancedEnvironment, params);
      return result && result.rawTransaction;
    },
    executeApproveTransfer: async (
      _,
      { from, signed, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      // TODO: The environment should not hold account data. Maybe?
      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const quoteToken = await loaders.quoteToken();
      const settings = await loaders.fundSettings.load(fundAddress);
      const params = {
        howMuch: createQuantity(quoteToken, investmentAmount),
        spender: settings.participationAddress,
      };

      const result = await approveTransfer.send(
        enhancedEnvironment,
        signed.rawTransaction,
        params,
      );

      return !!result;
    },
    estimateExecuteRequest: async (
      _,
      { from, fundAddress },
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

      const result = await executeRequest.prepare(
        enhancedEnvironment,
        settings.participationAddress,
      );

      return result && result.rawTransaction;
    },
    executeExecuteRequest: async (
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

      const result = await executeRequest.send(
        enhancedEnvironment,
        settings.participationAddress,
        signed.rawTransaction,
      );

      return !!result;
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
  },
};
