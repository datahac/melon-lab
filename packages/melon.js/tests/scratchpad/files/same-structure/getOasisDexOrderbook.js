import BigNumber from 'bignumber.js';

import transferTo from '../../../../lib/assets/transactions/transferTo';
import getBalance from '../../../../lib/assets/calls/getBalance';
import registerForCompetition from '../../../../lib/olympiad/transactions/registerForCompetition';
import claimReward from '../../../../lib/olympiad/transactions/claimReward';
import signOlympiadTermsAndConditions from '../../../../lib/olympiad/transactions/signOlympiadTermsAndConditions';
import getConfig from '../../../../lib/version/calls/getConfig';
import getEnvironment from '../../../../lib/utils/environment/getEnvironment';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import getFundRecentTrades from '../../../../lib/exchange/calls/getFundRecentTrades';
import getNativeAssetSymbol from '../../../../lib/version/calls/getNativeAssetSymbol';
import getOpenOrders from '../../../../lib/fund/calls/getOpenOrders';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import getParticipation from '../../../../lib/participation/calls/getParticipation';
import getQuoteAssetSymbol from '../../../../lib/pricefeeds/calls/getQuoteAssetSymbol';
import getRanking from '../../../../lib/version/calls/getRanking';
import getVersionContract from '../../../../lib/version/contracts/getVersionContract';
import importWalletFromMnemonic from '../../../../lib/utils/wallet/importWalletFromMnemonic';
import performCalculations from '../../../../lib/fund/calls/performCalculations';
import setEnvironment from '../../../../lib/utils/environment/setEnvironment';
import setupFund from '../../../../lib/version/transactions/setupFund';
import shutDownFund from '../../../../lib/fund/transactions/shutDownFund';
import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import toReadable from '../../../../lib/assets/utils/toReadable';
import trace from '../../../../lib/utils/generic/trace';
import redeemAllOwnedAssets from '../../../../lib/participation/transactions/redeemAllOwnedAssets';
import executeRequest from '../../../../lib/participation/transactions/executeRequest';
import awaitDataFeedUpdates from '../../../../lib/pricefeeds/events/awaitDataFeedUpdates';
import getOrderbook from '../../../../lib/exchange/calls/getOrderbook';

const shared = {
  etherBalance: {},
  participation: {},
  melonBalance: {},
  wethBalance: {},
};

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

fit(
  'Create fund, invest, take order, redeem',
  async () => {
    console.log('\n');

    const { providerType, api } = await getParityProvider();

    setEnvironment({ api, providerType, track: 'kovan-demo' });

    const environment = getEnvironment();
    const config = await getConfig(environment);
    const orderbook = await getOrderbook(environment, {
      baseTokenSymbol: 'MLN-T',
      quoteTokenSymbol: 'WETH-T',
    });
    console.log(orderbook);

    return true;
  },
  10 * 60 * 1000,
);
