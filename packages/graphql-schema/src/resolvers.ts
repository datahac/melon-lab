import * as R from 'ramda';
import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import Order from './types/Order';
import Quantity from './types/Quantity';
import Symbol from './types/Symbol';
import subscribeStream from './utils/subscribeStream';
import takeLast from './utils/takeLast';
import sameBlock from './utils/sameBlock';

export default {
  DateTime,
  Symbol,
  Quantity,
  Order,
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
    associatedFund: async (_, { address }, { loaders }) => {
      const fundAddress = await loaders.fundAddressFromManager.load(address);
      return fundAddress && await loaders.fundContract.load(fundAddress) || null;
    },
    funds: async (_, args, { loaders }) => {
      const addresses = await (args.addresses ||
        ((await loaders.fundRankings()) || []).map(fund => fund.address) ||
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
      return false;
    },
    redemptionAllowed: () => {
      // TODO: Where does this come from?
      return false;
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
    // TODO: Inline these.
    cancelOpenOrder: require('./resolvers/Mutation/cancelOpenOrder').default,
    createFund: require('./resolvers/Mutation/createFund').default,
    decryptWallet: (_, { wallet, password }, { loaders }) => {
      return loaders.decryptWallet(wallet, password);
    },
    restoreWallet: (_, { mnemonic, password }, { loaders }) => {
      return loaders.restoreWallet(mnemonic, password);
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
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.block$.skip(1).distinctUntilChanged(sameBlock);

        return subscribeStream(pubsub, 'current-block', stream$);
      },
    },
    nodeSynced: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.synced$.skip(1).distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'node-synced', stream$);
      },
    },
    totalFunds: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.ranking$
          .skip(1)
          .map(rankings => rankings.length)
          .distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'total-funds', stream$);
      },
    },
    priceFeedUp: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.priceFeed$
          .skip(1)
          .distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'price-feed', stream$);
      },
    },
    peerCount: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.provider$
          .skip(1)
          .distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'provider', stream$);
      },
    },
    versionConfig: {
      resolve: value => value,
      subscribe: (_, { key }, { pubsub, streams }) => {
        const stream$ = streams.config$
          .skip(1)
          .map(config => config && config[key])
          .distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, `version-config:${key}`, stream$);
      },
    },
    provider: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.provider$
          .skip(1)
          .distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'peer-count', stream$);
      },
    },
    network: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.network$.skip(1).distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'network', stream$);
      },
    },
    rankings: {
      resolve: value => value,
      subscribe: (_, __, { pubsub, streams }) => {
        const stream$ = streams.ranking$.skip(1).distinctUntilChanged(R.equals);

        return subscribeStream(pubsub, 'rankings', stream$);
      },
    },
  },
};
