import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import * as keytar from 'keytar';
import * as R from 'ramda';
import * as Rx from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pluck,
  buffer,
  filter,
  delay,
  takeUntil,
  take,
  merge,
} from 'rxjs/operators';
import * as Tm from '@melonproject/token-math';
import {
  Exchanges,
  getExpectedRate,
  getOpenOrders,
  getTokenBySymbol,
} from '@melonproject/protocol';

import sameBlock from './utils/sameBlock';
import toAsyncIterator from './utils/toAsyncIterator';

import { estimateNothing } from './mutators/estimateNothing';
import { estimateFundSetupBegin } from './mutators/estimateFundSetupBegin';
import { executeFundSetupBegin } from './mutators/executeFundSetupBegin';
import { estimateFundSetupStep } from './mutators/estimateFundSetupStep';
import { executeFundSetupStep } from './mutators/executeFundSetupStep';
import { estimateFundSetupComplete } from './mutators/estimateFundSetupComplete';
import { executeFundSetupComplete } from './mutators/executeFundSetupComplete';
import { estimateRequestInvestment } from './mutators/estimateRequestInvestment';
import { executeRequestInvestment } from './mutators/executeRequestInvestment';
import { estimateApproveTransfer } from './mutators/estimateApproveTransfer';
import { executeApproveTransfer } from './mutators/executeApproveTransfer';
import { estimateDeposit } from './mutators/estimateDeposit';
import { executeDeposit } from './mutators/executeDeposit';
import { estimateExecuteRequest } from './mutators/estimateExecuteRequest';
import { executeExecuteRequest } from './mutators/executeExecuteRequest';
import { estimateCancelRequest } from './mutators/estimateCancelRequest';
import { executeCancelRequest } from './mutators/executeCancelRequest';
import { estimateShutDownFund } from './mutators/estimateShutDownFund';
import { executeShutDownFund } from './mutators/executeShutDownFund';
import { estimateTriggerRewardAllFees } from './mutators/estimateTriggerRewardAllFees';
import { executeTriggerRewardAllFees } from './mutators/executeTriggerRewardAllFees';
import { estimateRedeem } from './mutators/estimateRedeem';
import { executeRedeem } from './mutators/executeRedeem';
import { estimateMakeOrder } from './mutators/estimateMakeOrder';
import { executeMakeOrder } from './mutators/executeMakeOrder';
import { estimateTakeOrder } from './mutators/estimateTakeOrder';
import { executeTakeOrder } from './mutators/executeTakeOrder';
import { estimateCancelOrder } from './mutators/estimateCancelOrder';
import { executeCancelOrder } from './mutators/executeCancelOrder';
import { estimateDeployUserWhitelist } from './mutators/estimateDeployUserWhitelist';
import { estimateDeployAssetBlacklist } from './mutators/estimateDeployAssetBlacklist';
import { estimateDeployAssetWhitelist } from './mutators/estimateDeployAssetWhitelist';
import { estimateDeployMaxConcentration } from './mutators/estimateDeployMaxConcentration';
import { estimateDeployMaxPositions } from './mutators/estimateDeployMaxPositions';
import { estimateDeployPriceTolerance } from './mutators/estimateDeployPriceTolerance';
import { executeDeploy } from './mutators/executeDeploy';
import { estimateRegisterPolicies } from './mutators/estimateRegisterPolicies';
import { executeRegisterPolicies } from './mutators/executeRegisterPolicies';
import { estimateDisableInvestment } from './mutators/estimateDisableInvestment';
import { executeDisableInvestment } from './mutators/executeDisableInvestment';
import { estimateEnableInvestment } from './mutators/estimateEnableInvestment';
import { executeEnableInvestment } from './mutators/executeEnableInvestment';

import { WalletTypes } from './context';

const exchangeMap = {
  [Exchanges.ZeroEx]: 'RADAR_RELAY',
  [Exchanges.MatchingMarket]: 'OASIS_DEX',
  [Exchanges.KyberNetwork]: 'KYBER_NETWORK',
  [Exchanges.Ethfinex]: 'ETHFINEX',
};

export default {
  DateTime,
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
    ethAccounts: async (_, __, { environment }) => {
      try {
        const accounts = await environment.eth.getAccounts();
        return accounts;
      } catch (e) {
        console.warn(e.message);
        return [];
      }
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
    quoteToken: (_, __, { loaders }) => {
      return loaders.quoteToken();
    },
    tokens: (_, __, { loaders }) => {
      return loaders.tokens();
    },
    orders: (_, { exchange, base, quote }, { loaders }) => {
      return loaders.exchangeOrders.load({ exchange, base, quote });
    },
    fund: (_, { address }, { loaders }) => {
      return (
        (Tm.isAddress(address) &&
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
    routes: (_, { manager }, { loaders }) => {
      return loaders.routes.load(manager);
    },
    hasActiveRequest: (_, { fundAddress, userAddress }, { loaders }) => {
      return loaders.hasActiveRequest.load({ fundAddress, userAddress });
    },
    kyberPrice: async (_, { symbol, quantity, type }, { environment }) => {
      const kyberNetworkProxy = R.path(
        [
          'deployment',
          'thirdPartyContracts',
          'exchanges',
          'kyber',
          'kyberNetworkProxy',
        ],
        environment,
      );

      const weth = getTokenBySymbol(environment, 'WETH');
      const makerAsset =
        type === 'BUY' ? weth : getTokenBySymbol(environment, symbol);
      const takerAsset =
        type === 'SELL' ? weth : getTokenBySymbol(environment, symbol);

      const fillTakerQuantity = Tm.createQuantity(takerAsset, quantity);
      const rate = await getExpectedRate(environment, kyberNetworkProxy, {
        makerAsset,
        takerAsset,
        fillTakerQuantity,
      });

      return rate;
    },
    openOrders: async (_, { fundAddress }, { environment, loaders }) => {
      const {
        tradingAddress,
        accountingAddress,
      } = await loaders.fundRoutes.load(fundAddress);
      const openOrders = await getOpenOrders(environment, tradingAddress);
      const denominationAsset = await loaders.fundDenominationAsset.load(
        accountingAddress,
      );

      const result = openOrders.map(order => {
        const type = Tm.isEqual(denominationAsset, order.makerQuantity.token)
          ? 'BID'
          : 'ASK';

        const trade =
          type === 'BID'
            ? Tm.createPrice(order.takerQuantity, order.makerQuantity)
            : Tm.createPrice(order.makerQuantity, order.takerQuantity);

        const volume = Tm.toFixed(trade.quote);
        const price = Tm.toFixed(trade);
        const exchange = exchangeMap[order.exchange];

        return {
          type,
          trade,
          volume,
          price,
          exchange,
          id: order.id,
          timestamp: order.timestamp,
          original: {
            id: order.id,
            timestamp: order.timestamp,
          },
        };
      });

      // TODO: Remove thiss
      const withoutEthfinex = result.filter(
        order => order.exchange !== 'ETHFINEX',
      );

      return withoutEthfinex;
    },
  },
  Ranking: {
    id: parent => {
      return Buffer.from(parent.address).toString('base64');
    },
    fund: parent => {
      return parent.address;
    },
    inception: parent => {
      return parent.creationTime;
    },
  },
  Fund: {
    id: parent => {
      return Buffer.from(parent).toString('base64');
    },
    address: parent => {
      return parent;
    },
    isComplete: (parent, _, { loaders }) => {
      return loaders.fundIsComplete.load(parent);
    },
    allowedExchanges: (parent, _, { loaders }) => {
      return loaders.fundAllowedExchanges.load(parent);
    },
    investAllowed: (parent, _, { loaders }) => {
      return loaders.fundInvestAllowed.load(parent);
    },
    policies: (parent, _, { loaders }) => {
      return loaders.fundPolicies.load(parent);
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
    routes: (parent, _, { loaders }) => {
      return loaders.fundRoutes.load(parent);
    },
    denominationAsset: (parent, _, { loaders }) => {
      return loaders.fundDenominationAsset.load(parent);
    },
    nativeAsset: (parent, _, { loaders }) => {
      return loaders.fundNativeAsset.load(parent);
    },
    totalSupply: (parent, _, { loaders }) => {
      return loaders.fundTotalSupply.load(parent);
    },
    rank: (parent, _, { loaders }) => {
      return loaders.fundRank.load(parent);
    },
    inception: (parent, _, { loaders }) => {
      return loaders.fundInception.load(parent);
    },
    personalStake: (parent, { investor }, { loaders }) => {
      return loaders.fundParticipation.load({
        investor,
        fund: parent,
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
    managementFeeRate: async (parent, _, { loaders }) => {
      return null;
    },
    performanceReward: async (parent, _, { loaders }) => {
      return null;
    },
    performanceFeeRate: async (parent, _, { loaders }) => {
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
  },
  UnsignedTransaction: {
    __resolveType: parent => {
      if (parent.hasOwnProperty('signedOrder')) {
        return 'UnsignedOrderTransaction';
      }

      return 'UnsignedPlainTransaction';
    },
  },
  OrderEvent: {
    __resolveType: parent => {
      switch (parent.event) {
        case 'SET':
          return 'SetOrderEvent';
        case 'REMOVE':
          return 'RemoveOrderEvent';
        default:
          throw new Error('Invalid order event type.');
      }
    },
  },
  Order: {
    __resolveType: object => {
      switch (object.exchange) {
        case 'RADAR_RELAY':
          return 'ZeroExOrder';
        case 'OASIS_DEX':
          return 'OasisDexOrder';
        case 'KYBER_NETWORK':
          return 'KyberNetworkOrder';
        case 'ETHFINEX':
          return 'EthfinexOrder';
        default:
          throw new Error('Invalid order type.');
      }
    },
    price: parent => Tm.toFixed(parent.trade),
    volume: parent => Tm.toFixed(parent.trade.base),
  },
  ZeroExOrder: {
    metadata: parent => parent.original.signedOrder,
  },
  OasisDexOrder: {
    metadata: parent => parent.original,
  },
  Policy: {
    parameters: parent => {
      const keys = Object.keys(parent.parameters);

      return keys.map(key => ({
        key,
        value: parent.parameters[key],
      }));
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
    estimateNothing,
    estimateFundSetupBegin,
    executeFundSetupBegin,
    estimateFundSetupStep,
    executeFundSetupStep,
    estimateFundSetupComplete,
    executeFundSetupComplete,
    estimateRequestInvestment,
    executeRequestInvestment,
    estimateApproveTransfer,
    executeApproveTransfer,
    estimateDeposit,
    executeDeposit,
    estimateExecuteRequest,
    executeExecuteRequest,
    estimateCancelRequest,
    executeCancelRequest,
    estimateShutDownFund,
    executeShutDownFund,
    estimateTriggerRewardAllFees,
    executeTriggerRewardAllFees,
    estimateRedeem,
    executeRedeem,
    estimateMakeOrder,
    executeMakeOrder,
    estimateTakeOrder,
    executeTakeOrder,
    estimateCancelOrder,
    executeCancelOrder,
    estimateDeployUserWhitelist,
    estimateDeployAssetBlacklist,
    estimateDeployAssetWhitelist,
    estimateDeployMaxConcentration,
    estimateDeployMaxPositions,
    estimateDeployPriceTolerance,
    executeDeploy,
    estimateRegisterPolicies,
    executeRegisterPolicies,
    estimateEnableInvestment,
    executeEnableInvestment,
    estimateDisableInvestment,
    executeDisableInvestment,
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
    useFrame: async (_, { address }, { environment, loaders }) => {
      const ethAccounts = await environment.eth.getAccounts();

      if (address.toLowerCase() !== ethAccounts[0].toLowerCase()) {
        throw new Error(
          `Address mismatch. ethAccounts: ${
            ethAccounts[0]
          }, argument: ${address}`,
        );
      }

      loaders.setWallet(
        {
          address,
        },
        WalletTypes.HARDWARE,
      );
    },
  },
  Subscription: {
    orders: {
      resolve: value => value,
      subscribe: async (_, { exchange, base, quote }, { loaders }) => {
        const observable$ = await loaders.exchangeOrdersObservable.load({
          exchange,
          base,
          quote,
        });

        // Default
        const default$ = Rx.of(null).pipe(
          delay(1000),
          takeUntil(observable$.pipe(take(1))),
        );

        // At the beginning, wait for 100ms after the first message, then
        // continuously buffer for 100ms intervals.
        //
        // TODO: Make the throttling depend on the actual input stream.
        const stream$ = observable$.pipe(
          buffer(Rx.timer(200, 1000)),
          filter(events => !!(events as any).length),
          merge(default$),
        );

        return toAsyncIterator(stream$);
      },
    },
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
        );

        return toAsyncIterator(stream$);
      },
    },
    priceFeedUp: {
      resolve: value => {
        return value;
      },
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.recentPrice$.pipe(
          distinctUntilChanged(R.equals),
        );

        return toAsyncIterator(stream$);
      },
    },
    peerCount: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.peers$.pipe(distinctUntilChanged(R.equals));

        return toAsyncIterator(stream$);
      },
    },
  },
};
