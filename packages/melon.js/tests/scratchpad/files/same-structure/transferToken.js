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

const INITIAL_SUBSCRIBE_QUANTITY = 10;

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

xit(
  'Create fund, invest, take order, redeem',
  async () => {
    console.log('\n');

    const { providerType, api } = await getParityProvider();

    // // 1 - instantiate wallet

    const wallet = importWalletFromMnemonic(
      'dinosaur pulse rice lumber machine entry tackle off require draw edge almost',
    );

    setEnvironment({ api, account: wallet, providerType });

    const environment = getEnvironment();
    const config = await getConfig(environment);

    const quoteAssetSymbol = await getQuoteAssetSymbol(environment);
    const nativeAssetSymbol = await getNativeAssetSymbol(environment);

    trace(
      `ProviderType: ${
        environment.providerType
      }, quoteAssetSymbol: ${quoteAssetSymbol}, nativeAssetSymbol: ${nativeAssetSymbol}`,
    );

    trace({
      message: `Start walkthrough with defaultAccount: ${
        environment.account.address
      }`,
    });

    shared.etherBalance.initial = await environment.api.eth
      .getBalance(environment.account.address)
      .then(balance => toReadable(config, balance, config.nativeAssetSymbol));
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });

    shared.melonBalance.initial = await getBalance(environment, {
      tokenSymbol: 'MLN-T',
      ofAddress: environment.account.address,
    });
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });
    shared.wethBalance.initial = await getBalance(environment, {
      tokenSymbol: quoteAssetSymbol,
      ofAddress: environment.account.address,
    });
    trace({ message: `WETH Balance: Ⓜ  ${shared.wethBalance.initial} ` });
    expect(shared.wethBalance.initial.toFixed()).toBeGreaterThan(
      INITIAL_SUBSCRIBE_QUANTITY,
    );

    shared.config = await getConfig(environment);
    trace({
      message: `Got config w OasisDex exchange at ${
        shared.config.matchingMarketAddress
      }, 0x exchange at ${shared.config.zeroExV1Address} and priceFeed at ${
        shared.config.canonicalPriceFeedAddress
      }`,
      data: shared.config,
    });

    const transfered = await transferTo(environment, {
      symbol: 'WETH-T',
      toAddress: '0xd0cf75FE8DceCaD3964F8E08228D7aF5a20bA77d',
      quantity: 10,
    });
    console.log(transfered);

    return true;
  },
  10 * 60 * 1000,
);
