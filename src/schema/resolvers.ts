import * as R from 'ramda';
import * as keytar from 'keytar';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import { map, pluck, distinctUntilChanged, skip } from 'rxjs/operators';
import {
  requestInvestment,
  executeRequest,
  approve as approveTransfer,
  shutDownFund,
  beginSetup,
  createParticipation,
  createPolicyManager,
  createShares,
  createTrading,
  createVault,
  createFeeManager,
  createAccounting,
  completeSetup,
} from '@melonproject/protocol';
import { isAddress, Address } from '@melonproject/token-math/address';
import { createQuantity } from '@melonproject/token-math/quantity';
import Order from './types/Order';
import toAsyncIterator from './utils/toAsyncIterator';
import sameBlock from './utils/sameBlock';

export default {
  DateTime,
  Order,
  Query: {
    defaultAccount: (_, __, { loaders }) => {
      const wallet = loaders.getWallet();
      return wallet && wallet.address;
    },
    allAccounts: (_, __, { loaders }) => {
      // TODO: Make this return all accounts.
      const wallet = loaders.getWallet();
      return wallet && wallet.address && [wallet.address];
    },
    hasStoredWallet: async () => {
      const credentials = await keytar.findCredentials('melon.fund');
      return !!(credentials && credentials.length);
    },
    stepFor: (_, { manager }, { loaders }) => {
      return loaders.stepFor.load(manager);
    },
    currentBlock: (_, __, { loaders }) => {
      return loaders.currentBlock();
    },
    nodeSynced: (_, __, { loaders }) => {
      return loaders.nodeSynced();
    },
    totalFunds: (_, __, { loaders }) => {
      return loaders.fundRanking().then(R.prop('length'));
    },
    priceFeedUp: (_, __, { loaders }) => {
      return loaders.priceFeedUp();
    },
    peerCount: (_, __, { loaders }) => {
      return loaders.peerCount();
    },
    contractDeployment: (_, __, { loaders }) => {
      return loaders.versionDeployment();
    },
    network: (_, __, { loaders }) => {
      return loaders.networkName();
    },
    rankings: (_, __, { loaders }) => {
      return loaders.fundRanking();
    },
    fund: (_, { address }, { loaders }) => {
      return (
        (isAddress(address) &&
          loaders.fundReady
            .load(address)
            .then(
              R.cond([
                [R.equals(true), R.always(address)],
                [R.equals(false), R.always(null)],
              ]),
            )) ||
        null
      );
    },
    fundByName: (_, { name }, { loaders }) => {
      return loaders.fundByName.load(name);
    },
    associatedFund: (_, { manager }, { loaders }) => {
      return loaders.fundAddressFromManager.load(manager);
    },
    balance: (_, { address, symbol }, { loaders }) => {
      return loaders.symbolBalance.load({ address, symbol });
    },
  },
  Ranking: {
    fund: parent => {
      return parent.address;
    },
    inception: parent => {
      return parent.creationTime;
    },
  },
  Fund: {
    address: parent => {
      return parent;
    },
    name: (parent, _, { loaders }) => {
      return loaders.fundName.load(parent);
    },
    isShutdown: (parent, _, { loaders }) => {
      return loaders.fundIsShutdown.load(parent);
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
    rank: (parent, _, { loaders }) => {
      return loaders.fundRank.load(parent);
    },
    modules: (parent, _, { loaders }) => {
      return loaders.fundModules.load(parent);
    },
    inception: (parent, _, { loaders }) => {
      return loaders.fundInception.load(parent);
    },
    personalStake: (parent, { investor }, { loaders }) => {
      return loaders.fundParticipation.load({
        fund: parent,
        investor,
      });
    },
    gav: (parent, _, { loaders }) => {
      return loaders.fundCalculations.load(parent).then(R.prop('gav'));
    },
    nav: (parent, _, { loaders }) => {
      return loaders.fundCalculations.load(parent).then(R.prop('nav'));
    },
    sharePrice: (parent, _, { loaders }) => {
      return loaders.fundCalculations.load(parent).then(R.prop('sharePrice'));
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
    holdings: async (parent, _, { loaders }) => {
      return loaders.fundHoldings.load(parent);
    },
    openOrders: (parent, { offset, limit }, { loaders }) => {
      return loaders.fundOpenOrders.load({
        address: parent,
      });
    },
    recentTrades: (parent, { base, quote, offset, limit }, { loaders }) => {
      return loaders.recentTrades.load({
        address: parent,
        base,
        quote,
      });
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
    estimateFundSetupBegin: async (
      _,
      { from, name, exchanges },
      { environment, loaders },
    ) => {
      const quoteToken = await loaders.quoteToken();
      const {
        exchangeConfigs,
        melonContracts: { priceSource, version },
        thirdPartyContracts: { tokens },
      } = environment.deployment;

      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const mlnToken = tokens.find(token => {
        return token.symbol === 'MLN';
      });

      // TODO: Properly handle provided fees, exchanges, tokens, etc.
      const params = {
        fees: [],
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

      const result = await beginSetup.prepare(
        enhancedEnvironment,
        version,
        params,
      );

      return result && result.rawTransaction;
    },
    executeFundSetupBegin: (_, { from, signed }, { environment }) => {
      const transaction = signed.rawTransaction;
      const version = environment.deployment.melonContracts.version;
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return beginSetup.send(env, version, transaction);
    },
    estimateFundSetupStep: async (_, { step, from }, { environment }) => {
      const version = environment.deployment.melonContracts.version;
      const fn = {
        CREATE_ACCOUNTING: createAccounting,
        CREATE_FEE_MANAGER: createFeeManager,
        CREATE_PARTICIPATION: createParticipation,
        CREATE_POLICY_MANAGER: createPolicyManager,
        CREATE_SHARES: createShares,
        CREATE_TRADING: createTrading,
        CREATE_VAULT: createVault,
      }[step];

      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await fn.prepare(env, version);

      return result && result.rawTransaction;
    },
    executeFundSetupStep: async (
      _,
      { step, from, signed },
      { environment },
    ) => {
      const version = environment.deployment.melonContracts.version;
      const transaction = signed.rawTransaction;
      const fn = {
        CREATE_ACCOUNTING: createAccounting,
        CREATE_FEE_MANAGER: createFeeManager,
        CREATE_PARTICIPATION: createParticipation,
        CREATE_POLICY_MANAGER: createPolicyManager,
        CREATE_SHARES: createShares,
        CREATE_TRADING: createTrading,
        CREATE_VAULT: createVault,
      }[step];

      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await fn.send(env, version, transaction);

      return !!result;
    },

    estimateFundSetupComplete: async (_, { from }, { environment }) => {
      const version = environment.deployment.melonContracts.version;
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await completeSetup.prepare(env, version);

      return result && result.rawTransaction;
    },
    executeFundSetupComplete: async (_, { from, signed }, { environment }) => {
      const version = environment.deployment.melonContracts.version;
      const transaction = signed.rawTransaction;
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      return completeSetup.send(env, version, transaction);
    },
    estimateRequestInvestment: async (
      _,
      { from, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      const { tokens } = environment.deployment.thirdPartyContracts;
      const { participationAddress } = await loaders.fundSettings.load(
        fundAddress,
      );
      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const params = {
        investmentAmount: createQuantity(nativeToken, investmentAmount),
      };

      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await requestInvestment.prepare(
        env,
        participationAddress,
        params,
      );

      return result && result.rawTransaction;
    },
    executeRequestInvestment: async (
      _,
      { from, signed, fundAddress },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundSettings.load(
        fundAddress,
      );
      const transaction = signed.rawTransaction;
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await requestInvestment.send(
        env,
        participationAddress,
        transaction,
      );

      return !!result;
    },
    estimateApproveTransfer: async (
      _,
      { from, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundSettings.load(
        fundAddress,
      );
      const quoteToken = await loaders.quoteToken();
      const params = {
        howMuch: createQuantity(quoteToken, investmentAmount),
        spender: participationAddress,
      };

      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await approveTransfer.prepare(env, params);
      return result && result.rawTransaction;
    },
    executeApproveTransfer: async (
      _,
      { from, signed, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundSettings.load(
        fundAddress,
      );
      const quoteToken = await loaders.quoteToken();
      const transaction = signed.rawTransaction;
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const params = {
        howMuch: createQuantity(quoteToken, investmentAmount),
        spender: participationAddress,
      };

      const result = await approveTransfer.send(env, transaction, params);

      return !!result;
    },
    estimateExecuteRequest: async (
      _,
      { from, fundAddress },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundSettings.load(
        fundAddress,
      );
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await executeRequest.prepare(env, participationAddress);

      return result && result.rawTransaction;
    },
    executeExecuteRequest: async (
      _,
      { from, signed, fundAddress },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundSettings.load(
        fundAddress,
      );
      const transaction = signed.rawTransaction;
      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await executeRequest.send(
        env,
        participationAddress,
        transaction,
      );

      return !!result;
    },
    estimateShutDownFund: async (_, { from, fundAddress }, { environment }) => {
      const params = {
        hub: fundAddress,
      };

      const env = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await shutDownFund.prepare(
        env,
        environment.deployment.melonContracts.version,
        params,
      );

      return result && result.rawTransaction;
    },
    executeShutDownFund: async (
      _,
      { from, signed, fundAddress },
      { environment },
    ) => {
      const version = environment.deployment.melonContracts.version;
      const transaction = signed.rawTransaction;
      const params = {
        hub: fundAddress,
      };

      const enhancedEnvironment = {
        ...environment,
        wallet: {
          address: new Address(from),
        },
      };

      const result = await shutDownFund.send(
        enhancedEnvironment,
        version,
        transaction,
        params,
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
    balance: {
      resolve: value => value,
      subscribe: async (_, { symbol, address }, { loaders }) => {
        const observable$ = await loaders.symbolBalanceObservable.load({
          symbol,
          address,
        });
        const stream$ = observable$.pipe(distinctUntilChanged(R.equals));

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
