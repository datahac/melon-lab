import * as R from 'ramda';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
import Order from './types/Order';
import toAsyncIterator from './utils/toAsyncIterator';
import takeLast from './utils/takeLast';
import sameBlock from './utils/sameBlock';

export default {
  DateTime,
  Json: GraphQLJSON,
  ExchangeContractEnum: {
    MATCHING_MARKET: 'MatchingMarket',
    ZERO_EX_EXCHANGE: 'ZeroExExchange',
    KYBER_NETWORK_PROXY: 'KyberNetworkProxy',
  },
  ConfigKeyEnum: {
    CANONICAL_PRICE_FEED_ADDRESS: 'onlyManagerCompetitionAddress',
    COMPETITION_COMPLIANCE_ADDRESS: 'competitionComplianceAddress',
    ONLY_MANAGER_COMPETITION_ADDRESS: 'onlyManagerCompetitionAddress',
    NO_COMPLIANCE_ADDRESS: 'noComplianceAddress',
    MATCHING_MARKET_ADDRESS: 'matchingMarketAddress',
    MATCHING_MARKET_ADAPTER: 'matchingMarketAdapter',
    ZERO_EX_V1_ADDRESS: 'zeroExV1Address',
    ZERO_EX_V1_ADAPTER_ADDRESS: 'zeroExV1AdapterAddress',
    RANKING_ADDRESS: 'rankingAddress',
    RISK_MANAGEMENT_ADDRESS: 'riskManagementAddress',
    VERSION_ADDRESS: 'versionAddress',
    GOVERNANCE_ADDRESS: 'governanceAddress',
    OLYMPIAD_ADDRESS: 'olympiadAddress',
    KYBER_NETWORK_ADDRESS: 'kyberNetworkAddress',
    KYBER_ADAPTER: 'kyberAdapter',
  },
  Order,
  Query: {
    openOrders: async (_, { address }, { loaders }) => {
      const contract = await loaders.fundContract.load(address);
      return loaders.fundOpenOrders.load(contract);
    },
    recentTrades: (_, { baseTokenSymbol, quoteTokenSymbol }, { loaders }) => {
      return loaders.recentTrades.load({ baseTokenSymbol, quoteTokenSymbol });
    },
    currentBlock: (_, __, { streams }) => {
      return takeLast(streams.block$);
    },
    nodeSynced: (_, __, { streams }) => {
      return takeLast(streams.synced$);
    },
    totalFunds: (_, __, { streams }) => {
      return takeLast(streams.ranking$).then(R.propOr(null, 'length'));
    },
    priceFeedUp: (_, __, { streams }) => {
      return takeLast(streams.priceFeed$);
    },
    peerCount: (_, __, { streams }) => {
      return takeLast(streams.peers$);
    },
    versionConfig: (_, { key }, { streams }) => {
      return takeLast(streams.config$).then(R.propOr(null, key));
    },
    provider: (_, __, { streams }) => {
      return takeLast(streams.provider$);
    },
    network: (_, __, { streams }) => {
      return takeLast(streams.network$);
    },
    rankings: (_, __, { streams }) => {
      return takeLast(streams.ranking$);
    },
    fund: async (_, { address }, { loaders }) => {
      return loaders.fundContract.load(address);
    },
    fundByName: async (_, { name }, { loaders, streams }) => {
      const rankings = await takeLast(streams.ranking$) || [];
      const fund = rankings.find((fund) => fund.name === name);
      return fund && loaders.fundContract.load(fund.address);
    },
    associatedFund: async (_, { account }, { loaders }) => {
      const fundAddress = await loaders.fundAddressFromManager.load(account);
      return fundAddress || null;
    },
    funds: async (_, args, { loaders, streams }) => {
      const addresses = await (args.addresses || (
        await takeLast(streams.ranking$) || []).map(fund => fund.address) ||
        []);

      return loaders.fundContract.loadMany(addresses);
    },
    price: (_, { symbol }, { loaders }) => {
      return loaders.symbolPrice.load(symbol);
    },
    balance: (_, { address, token }, { loaders }) => {
      switch (token) {
        case 'WETH':
          return loaders.nativeBalance.load(address);
        case 'ETH':
          return loaders.etherBalance.load(address);
        case 'MLN':
          return loaders.melonBalance.load(address);
      }

      return null;
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
        return R.propOr(null, 'rank', entry);
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
      // TODO: Prepare setup fund.
      throw new Error('This is not implemented yet');
    },
    executeSetupFund: async (_, { name, exchanges, gasLimit, gasPrice }) => {
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
      return wallet.encrypt(password);
    },
    importWallet: (_, { wallet, password }, { loaders }) => {
      return loaders.importWallet(wallet, password, (decrypted, encrypted) => {
        // TODO: Store encrypted wallet in keytar storage and save current
        // decrypted wallet and private key in memory.
        throw new Error('This is not implemented yet');
      });
    },
    restoreWallet: (_, { mnemonic, password }, { loaders }) => {
      return loaders.restoreWallet(mnemonic, password, (decrypted, encrypted) => {
        // TODO: Store encrypted wallet in keytar storage and save current
        // decrypted wallet and private key in memory.
        throw new Error('This is not implemented yet');
      });
    },
    generateMnemonic: (_, __, { loaders }) => {
      return loaders.generateMnemonic();
    },
  },
  Subscription: {
    // TODO: Inline these.
    balance: require('./subscriptions/balance').default,
    orderbook: require('./subscriptions/orderbook').default,
    currentBlock: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.block$.distinctUntilChanged(sameBlock).skip(1);
        return toAsyncIterator(stream$);
      },
    },
    nodeSynced: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.synced$.distinctUntilChanged(R.equals).skip(1);
        return toAsyncIterator(stream$);
      },
    },
    totalFunds: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.ranking$
          .map(rankings => rankings.length)
          .distinctUntilChanged(R.equals)
          .skip(1);

        return toAsyncIterator(stream$);
      },
    },
    priceFeedUp: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.priceFeed$
          .distinctUntilChanged(R.equals)
          .skip(1);

        return toAsyncIterator(stream$);
      },
    },
    peerCount: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.provider$
          .distinctUntilChanged(R.equals)
          .skip(1);

        return toAsyncIterator(stream$);
      },
    },
    versionConfig: {
      resolve: value => value,
      subscribe: (_, { key }, { streams }) => {
        const stream$ = streams.config$
          .map(config => config && config[key])
          .distinctUntilChanged(R.equals)
          .skip(1);

        return toAsyncIterator(stream$);
      },
    },
    provider: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.provider$
          .distinctUntilChanged(R.equals)
          .skip(1);

        return toAsyncIterator(stream$);
      },
    },
    network: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.network$.distinctUntilChanged(R.equals).skip(1);
        return toAsyncIterator(stream$);
      },
    },
    rankings: {
      resolve: value => value,
      subscribe: (_, __, { streams }) => {
        const stream$ = streams.ranking$.distinctUntilChanged(R.equals).skip(1);
        return toAsyncIterator(stream$);
      },
    },
  },
};
