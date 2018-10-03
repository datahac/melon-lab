import { GraphQLDateTime as DateTime } from 'graphql-iso-date';
import Order from './resolvers/Order';
import Quantity from './resolvers/Quantity';
import Subscription from './resolvers/Subscription';
import Symbol from './resolvers/Symbol';

export default {
  DateTime,
  Symbol,
  Quantity,
  Query: {
    openOrders: require('./resolvers/Query/openOrders').default,
    recentTrades: require('./resolvers/Query/recentTrades').default,
    mnemonic: require('./resolvers/Query/mnemonic').default,
    totalFunds: async (_, __, { loaders }) => {
      const ranking = await loaders.fundRankings();
      return (ranking && ranking.length) || 0;
    },
    config: () => {
      // We need to return something other than null.
      return {};
    },
    status: (_, __, { loaders }) => {
      return {
        priceFeedUp: true,
        nodeSyncing: false,
        blockOverdue: false,
      };
    },
    wallet: () => {
      // This needs to be implemented in the concrete client.
      return {};
    },
    provider: (_, __, { provider }) => {
      return provider;
    },
    network: (_, __, { network }) => {
      return network;
    },
    block: (_, __, { loaders }) => {
      return loaders.currentBlock();
    },
    rankings: (_, __, { loaders }) => {
      return loaders.fundRankings();
    },
    fund: (_, { address }, { loaders }) => {
      return loaders.fundContract.load(address);
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
    rank: async (parent, _, { loaders }) => {
      const ranking = await loaders.fundRanking.load(parent);
      return ranking && ranking.rank;
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
    gav: async (parent, _, { loaders, precision = 18 }) => {
      const calculations = await loaders.fundCalculations.load(parent);
      return calculations[0].div(10 ** precision);
    },
    personalStake: async (parent, { investor }, { loaders }) => {
      const participation = await loaders.fundParticipation.load({
        fund: parent,
        investor: investor,
      });

      return participation && participation.personalStake;
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
  Config: {
    canonicalPriceFeedAddress: (_, __, { config }) => {
      return config.canonicalPriceFeedAddress;
    },
    competitionComplianceAddress: (_, __, { config }) => {
      return config.competitionComplianceAddress;
    },
    onlyManagerCompetitionAddress: (_, __, { config }) => {
      return config.onlyManagerCompetitionAddress;
    },
  },
  Mutation: {
    cancelOpenOrder: require('./resolvers/Mutation/cancelOpenOrder').default,
    createFund: require('./resolvers/Mutation/createFund').default,
    decryptWallet: require('./resolvers/Mutation/decryptWallet').default,
    restoreWallet: require('./resolvers/Mutation/restoreWallet').default,
    deleteWallet: () => {
      // This needs to be implement in the concrete client implementation.
      return true;
    },
  },
  Subscription,
  Order,
};
