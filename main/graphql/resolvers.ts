import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import * as keytar from 'keytar';
import * as R from 'ramda';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';

import * as Tm from '@melonproject/token-math';
import {
  approve as approveTransfer,
  beginSetup,
  cancelOasisDexOrder,
  completeSetup,
  Contracts,
  createAccounting,
  createFeeManager,
  createOrder,
  createParticipation,
  createPolicyManager,
  createShares,
  createTrading,
  createVault,
  deployContract,
  Exchanges,
  executeRequest,
  FunctionSignatures,
  getExpectedRate,
  getOasisDexOrder,
  getOpenOrders,
  getTokenBySymbol,
  getWrapperLock,
  makeOasisDexOrder,
  register,
  requestInvestment,
  shutDownFund,
  triggerRewardAllFees,
  withDifferentAccount,
} from '@melonproject/protocol';

import sameBlock from './utils/sameBlock';
import toAsyncIterator from './utils/toAsyncIterator';
import { estimateTakeOrder } from './mutators/estimateTakeOrder';
import { executeTakeOrder } from './mutators/executeTakeOrder';
import { getToken } from '@melonproject/protocol/lib/contracts/dependencies/token/calls/getToken';

const stringifyObject = R.mapObjIndexed((value, key) => `${value}`);

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
    availableTokens: (_, __, { loaders }) => {
      return loaders.availableTokens();
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
          id: order.id,
          type,
          trade,
          volume,
          price,
          exchange,
          timestamp: order.timestamp,
          original: {
            id: order.id,
            timestamp: order.timestamp,
          },
        };
      });

      return result;
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
    estimateFundSetupBegin: async (
      _,
      { from, name, exchanges, managementFee, performanceFee },
      { environment, loaders },
    ) => {
      const quoteToken = await loaders.quoteToken();
      const {
        exchangeConfigs,
        melonContracts: { priceSource, version },
        thirdPartyContracts: { tokens },
      } = environment.deployment;

      const selectedExchanges = {
        ...(exchanges.includes('ZERO_EX_EXCHANGE') && {
          ZeroEx: exchangeConfigs.ZeroEx,
        }),
        ...(exchanges.includes('MATCHING_MARKET') && {
          MatchingMarket: exchangeConfigs.MatchingMarket,
        }),
        ...(exchanges.includes('KYBER_NETWORK') && {
          KyberNetwork: exchangeConfigs.KyberNetwork,
        }),
        ...(exchanges.includes('ETHFINEX') && {
          Ethfinex: exchangeConfigs.Ethfinex,
        }),
      };

      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const mlnToken = tokens.find(token => {
        return token.symbol === 'MLN';
      });

      const fees = [
        {
          feeAddress: environment.deployment.melonContracts.fees.managementFee.toLowerCase(),
          feePeriod: new Tm.BigInteger(0),
          feeRate: new Tm.BigInteger(
            Tm.multiply(
              new Tm.BigInteger(managementFee),
              Tm.power(new Tm.BigInteger(10), new Tm.BigInteger(16)),
            ),
          ),
        },
        {
          feeAddress: environment.deployment.melonContracts.fees.performanceFee.toLowerCase(),
          feePeriod: new Tm.BigInteger(86400 * 90),
          feeRate: new Tm.BigInteger(
            Tm.multiply(
              new Tm.BigInteger(performanceFee),
              Tm.power(new Tm.BigInteger(10), new Tm.BigInteger(16)),
            ),
          ),
        },
      ];

      // TODO: Properly handle provided exchanges, tokens, etc.
      const params = {
        fees,
        defaultTokens: [quoteToken, mlnToken],
        exchangeConfigs: selectedExchanges,
        fundName: name,
        priceSource,
        quoteToken,
        nativeToken,
      };

      // TODO: The environment should not hold account data. Maybe?
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await beginSetup.prepare(env, version, params);

      return result && result.rawTransaction;
    },
    executeFundSetupBegin: (_, { from, signed }, { environment }) => {
      const transaction = signed.rawTransaction;
      const version = environment.deployment.melonContracts.version;
      const env = withDifferentAccount(environment, new Tm.Address(from));

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

      const env = withDifferentAccount(environment, new Tm.Address(from));
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
        // TODO: Change
        CREATE_ACCOUNTING: createAccounting,
        CREATE_FEE_MANAGER: createFeeManager,
        CREATE_PARTICIPATION: createParticipation,
        CREATE_POLICY_MANAGER: createPolicyManager,
        CREATE_SHARES: createShares,
        CREATE_TRADING: createTrading,
        CREATE_VAULT: createVault,
      }[step];

      const env = withDifferentAccount(environment, new Tm.Address(from));
      const result = await fn.send(env, version, transaction);

      return !!result;
    },

    estimateFundSetupComplete: async (_, { from }, { environment }) => {
      const version = environment.deployment.melonContracts.version;
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const result = await completeSetup.prepare(env, version);

      return result && result.rawTransaction;
    },
    executeFundSetupComplete: async (_, { from, signed }, { environment }) => {
      const version = environment.deployment.melonContracts.version;
      const transaction = signed.rawTransaction;
      const env = withDifferentAccount(environment, new Tm.Address(from));

      return completeSetup.send(env, version, transaction);
    },
    estimateRequestInvestment: async (
      _,
      { from, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      const { tokens } = environment.deployment.thirdPartyContracts;
      const {
        participationAddress,
        sharesAddress,
      } = await loaders.fundRoutes.load(fundAddress);
      const nativeToken = tokens.find(token => {
        return token.symbol === 'WETH';
      });

      const fundToken = await getToken(environment, sharesAddress);

      const params = {
        investmentAmount: Tm.createQuantity(nativeToken, investmentAmount),
        requestedShares: Tm.createQuantity(fundToken, investmentAmount),
      };

      const env = withDifferentAccount(environment, new Tm.Address(from));

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
      const { participationAddress } = await loaders.fundRoutes.load(
        fundAddress,
      );
      const transaction = signed.rawTransaction;
      const env = withDifferentAccount(environment, new Tm.Address(from));

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
      const { participationAddress } = await loaders.fundRoutes.load(
        fundAddress,
      );
      const quoteToken = await loaders.quoteToken();
      const params = {
        howMuch: Tm.createQuantity(quoteToken, investmentAmount),
        spender: participationAddress,
      };

      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await approveTransfer.prepare(env, params);
      return result && result.rawTransaction;
    },
    executeApproveTransfer: async (
      _,
      { from, signed, fundAddress, investmentAmount },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundRoutes.load(
        fundAddress,
      );
      const quoteToken = await loaders.quoteToken();
      const transaction = signed.rawTransaction;
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const params = {
        howMuch: Tm.createQuantity(quoteToken, investmentAmount),
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
      const { participationAddress } = await loaders.fundRoutes.load(
        fundAddress,
      );
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await executeRequest.prepare(env, participationAddress);

      return result && result.rawTransaction;
    },
    executeExecuteRequest: async (
      _,
      { from, signed, fundAddress },
      { environment, loaders },
    ) => {
      const { participationAddress } = await loaders.fundRoutes.load(
        fundAddress,
      );
      const transaction = signed.rawTransaction;
      const env = withDifferentAccount(environment, new Tm.Address(from));

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

      const env = withDifferentAccount(environment, new Tm.Address(from));

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

      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await shutDownFund.send(env, version, transaction, params);

      return !!result;
    },
    estimateTriggerRewardAllFees: async (
      _,
      { from, fundAddress },
      { environment, loaders },
    ) => {
      const { feeManagerAddress } = await loaders.fundRoutes.load(fundAddress);

      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await triggerRewardAllFees.prepare(env, feeManagerAddress);

      return result && result.rawTransaction;
    },
    executeTriggerRewardAllFees: async (
      _,
      { from, signed, fundAddress },
      { environment, loaders },
    ) => {
      const { feeManagerAddress } = await loaders.fundRoutes.load(fundAddress);
      const transaction = signed.rawTransaction;
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await triggerRewardAllFees.send(
        env,
        feeManagerAddress,
        transaction,
      );

      return !!result;
    },
    estimateMakeOrder: async (
      _,
      { from, exchange, buyToken, buyQuantity, sellToken, sellQuantity },
      { environment, loaders },
    ) => {
      const fund = await loaders.fundAddressFromManager.load(from);
      const { tradingAddress } = await loaders.fundRoutes.load(fund);
      const env = withDifferentAccount(environment, new Tm.Address(from));

      if (exchange === 'OASIS_DEX') {
        const makerQuantity = Tm.createQuantity(
          getTokenBySymbol(environment, sellToken),
          sellQuantity,
        );
        const takerQuantity = Tm.createQuantity(
          getTokenBySymbol(environment, buyToken),
          buyQuantity,
        );

        const result = await makeOasisDexOrder.prepare(env, tradingAddress, {
          makerQuantity,
          takerQuantity,
        });

        return result && result.rawTransaction;
      }

      throw new Error(`Make order not implemented for ${exchange}`);
    },
    executeMakeOrder: async (
      _,
      { from, signed, exchange },
      { environment, loaders },
    ) => {
      const fund = await loaders.fundAddressFromManager.load(from);
      const {
        tradingAddress,
        accountingAddress,
      } = await loaders.fundRoutes.load(fund);
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const denominationAsset = await loaders.fundDenominationAsset.load(
        accountingAddress,
      );

      if (exchange === 'OASIS_DEX') {
        const result = await makeOasisDexOrder.send(
          env,
          tradingAddress,
          signed.rawTransaction,
        );

        const type = Tm.isEqual(denominationAsset, result.sell.token)
          ? 'BID'
          : 'ASK';

        const trade =
          type === 'BID'
            ? Tm.createPrice(result.buy, result.sell)
            : Tm.createPrice(result.sell, result.buy);

        const volume = Tm.toFixed(trade.quote);

        const order = {
          type,
          trade,
          volume,
          exchange,
          id: result.id,
          price: Tm.toFixed(trade),
          metadata: {
            id: result.id,
            isActive: !result.matched,
          },
        };

        return order;
      }

      throw new Error(`Make order not implemented for ${exchange}`);
    },
    estimateTakeOrder,
    executeTakeOrder,
    estimateCancelOasisDexOrder: async (
      _,
      { from, id },
      { environment, loaders },
    ) => {
      const fund = await loaders.fundAddressFromManager.load(from);
      const { tradingAddress } = await loaders.fundRoutes.load(fund);
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const oasisDex = R.path(
        ['deployment', 'thirdPartyContracts', 'exchanges', 'matchingMarket'],
        env,
      );

      const order = await getOasisDexOrder(env, oasisDex, { id });

      // const makerAsset = new Tm.Address(
      //   getTokenBySymbol(env, sellToken).address || '',
      // );
      // const takerAsset = new Tm.Address(
      //   getTokenBySymbol(env, buyToken).address || '',
      // );

      const result = await cancelOasisDexOrder.prepare(env, tradingAddress, {
        id,
        maker: tradingAddress,
        makerAsset: order.sell.token.address,
        takerAsset: order.buy.token.address,
      });

      return result && result.rawTransaction;
    },
    executeCancelOasisDexOrder: async (
      _,
      { from, signed },
      { environment, loaders },
    ) => {
      const fund = await loaders.fundAddressFromManager.load(from);
      const { tradingAddress } = await loaders.fundRoutes.load(fund);
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await cancelOasisDexOrder.send(
        env,
        tradingAddress,
        signed.rawTransaction,
      );

      return !!result;
    },
    create0xOrder: async (
      _,
      { from, buyToken, buyQuantity, sellToken, sellQuantity },
      { environment, loaders },
    ) => {
      const fund = await loaders.fundAddressFromManager.load(from);
      const { tradingAddress } = await loaders.fundRoutes.load(fund);
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const zeroExAddress =
        env.deployment.exchangeConfigs[Exchanges.ZeroEx].exchange;

      const makerQuantity = Tm.createQuantity(
        getTokenBySymbol(environment, sellToken),
        sellQuantity,
      );
      const takerQuantity = Tm.createQuantity(
        getTokenBySymbol(environment, buyToken),
        buyQuantity,
      );

      const order = await createOrder(env, zeroExAddress, {
        makerQuantity,
        takerQuantity,
        makerAddress: tradingAddress,
      });

      return stringifyObject(order);
    },
    createEthfinexOrder: async (
      _,
      { from, buyToken, buyQuantity, sellToken, sellQuantity },
      { environment, loaders },
    ) => {
      const fund = await loaders.fundAddressFromManager.load(from);
      const { tradingAddress } = await loaders.fundRoutes.load(fund);
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const ethfinexAddress =
        env.deployment.exchangeConfigs[Exchanges.Ethfinex].exchange;
      const wrapperRegistryEFX =
        env.deployment.thirdPartyContracts.exchanges.ethfinex
          .wrapperRegistryEFX;

      const makerWrapperLock = await getWrapperLock(env, wrapperRegistryEFX, {
        token: getTokenBySymbol(environment, sellToken),
      });

      const makerQuantity = Tm.createQuantity(makerWrapperLock, sellQuantity);
      const takerQuantity = Tm.createQuantity(
        getTokenBySymbol(environment, buyToken),
        buyQuantity,
      );

      const order = await createOrder(env, ethfinexAddress, {
        makerQuantity,
        takerQuantity,
        makerAddress: tradingAddress,
      });

      return stringifyObject(order);
    },
    // tslint:disable:object-shorthand-properties-first
    estimateDeployUserWhitelist: async (
      _,
      { from, addresses },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await deployContract.prepare(
        env,
        Contracts.UserWhitelist,
        [addresses],
      );

      return result.unsignedTransaction;
    },
    estimateDeployAssetBlacklist: async (
      _,
      { from, symbols },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const addresses = symbols.map(
        symbol => getTokenBySymbol(env, symbol).address,
      );

      const result = await deployContract.prepare(
        env,
        Contracts.AssetBlacklist,
        [addresses],
      );

      return result.unsignedTransaction;
    },
    estimateDeployAssetWhitelist: async (
      _,
      { from, symbols },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const addresses = symbols.map(
        symbol => getTokenBySymbol(env, symbol).address,
      );

      const result = await deployContract.prepare(
        env,
        Contracts.AssetWhitelist,
        [addresses],
      );

      return result.unsignedTransaction;
    },
    estimateDeployMaxConcentration: async (
      _,
      { from, percent },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await deployContract.prepare(
        env,
        Contracts.MaxConcentration,
        [
          `${Tm.divide(
            Tm.appendDecimals(Tm.createToken('ETH'), percent),
            100,
          )}`,
        ],
      );
      return result.unsignedTransaction;
    },
    estimateDeployMaxPositions: async (
      _,
      { from, positions },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await deployContract.prepare(env, Contracts.MaxPositions, [
        `${positions}`,
      ]);

      return result.unsignedTransaction;
    },
    estimateDeployPriceTolerance: async (
      _,
      { from, percent },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));

      const result = await deployContract.prepare(
        env,
        Contracts.PriceTolerance,
        [`${percent}`],
      );

      return result.unsignedTransaction;
    },
    executeDeploy: async (_, { from, signed }, { environment, loaders }) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const result = await deployContract.send(env, {
        signedTransaction: signed.rawTransaction,
      });
      return result;
    },
    estimateRegisterPolicies: async (
      _,
      { from, policies },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const fund = await loaders.fundAddressFromManager.load(from);
      const { policyManagerAddress } = await loaders.fundRoutes.load(fund);

      const registrations = policies.reduce((carry, current) => {
        if (current.type === 'TRADE') {
          return [
            {
              method: FunctionSignatures.takeOrder,
              policy: current.address,
            },
            {
              method: FunctionSignatures.makeOrder,
              policy: current.address,
            },
            {
              method: FunctionSignatures.cancelOrder,
              policy: current.address,
            },
            ...carry,
          ];
        }
        return [
          {
            method: FunctionSignatures.executeRequestFor,
            policy: current.address,
          },
        ];
      }, []);

      const result = await register.prepare(
        env,
        policyManagerAddress,
        registrations,
      );

      return result.rawTransaction;
    },
    executeRegisterPolicies: async (
      _,
      { from, signed },
      { environment, loaders },
    ) => {
      const env = withDifferentAccount(environment, new Tm.Address(from));
      const fund = await loaders.fundAddressFromManager.load(from);
      const { policyManagerAddress } = await loaders.fundRoutes.load(fund);

      const result = await register.send(
        env,
        policyManagerAddress,
        signed.rawTransaction,
      );

      return result;
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
