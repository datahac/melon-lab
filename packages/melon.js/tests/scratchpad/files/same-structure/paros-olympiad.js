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

const shared = { etherBalance: {}, participation: {}, melonBalance: {} };

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

xit(
  'Create fund, contribute to Paros contract, and claimReward',
  async () => {
    console.log('\n');

    const { providerType, api } = await getParityProvider();

    const wallet = importWalletFromMnemonic(
      'dinosaur pulse rice lumber machine entry tackle off require draw edge almost',
    );

    setEnvironment({ api, account: wallet, providerType });

    const environment = getEnvironment();
    const config = await getConfig(environment);
    const quoteAssetSymbol = await getQuoteAssetSymbol(environment);
    const melonAssetSymbol = config.melonAssetSymbol;
    const CONTRIBUTION_QUANTITY = 10;
    const expectedMelonReceived = CONTRIBUTION_QUANTITY * 20;
    trace(
      `ProviderType: ${
        environment.providerType
      }, quoteAssetSymbol: ${quoteAssetSymbol}, melonAssetSymbol: ${melonAssetSymbol}`,
    );

    trace({
      message: `Start walkthrough with defaultAccount: ${
        environment.account.address
      }`,
    });

    shared.etherBalance.initial = await environment.api.eth
      .getBalance(environment.account.address)
      .then(balance => toReadable(config, balance, config.quoteAssetSymbol));
    trace({ message: `Etherbalance: Ξ${shared.etherBalance.initial} ` });

    shared.melonBalance.initial = await getBalance(environment, {
      tokenSymbol: 'MLN-T',
      ofAddress: environment.account.address,
    });
    trace({ message: `Melon Balance: Ⓜ  ${shared.melonBalance.initial} ` });

    shared.config = await getConfig(environment);
    trace({
      message: `Got config w OasisDex exchange at ${
        shared.config.matchingMarketAddress
      }, 0x exchange at ${shared.config.zeroExV1Address} and priceFeed at ${
        shared.config.canonicalPriceFeedAddress
      }`,
      data: shared.config,
    });

    const versionContract = await getVersionContract(environment);
    let managerToFunds = await versionContract.instance.managerToFunds.call(
      {},
      [wallet.address],
    );

    // If wallet already has a fund, need to shut it down before creating a new one -Only for integration purposes
    if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
      trace({
        message: `Existing fund needs to be shut down:: ${managerToFunds}`,
      });
      await shutDownFund(environment, { fundAddress: managerToFunds });
      trace({
        message: 'Shutting down existing fund',
      });
      managerToFunds = await versionContract.instance.managerToFunds.call({}, [
        environment.account.address,
      ]);
    }

    const signature = await signTermsAndConditions(environment);
    shared.fundName = randomString();
    shared.fund = await setupFund(environment, {
      name: shared.fundName,
      signature,
      exchangeNames: ['MatchingMarket', 'ZeroExExchange'],
    });

    expect(shared.fund.name).toBe(shared.fundName);
    expect(shared.fund.address).toBeTruthy();
    expect(shared.fund.inception instanceof Date).toBeTruthy();
    trace({
      message: `fundCreated: ${shared.fund.name} (${shared.fund.id}) at ${
        shared.fund.address
      }`,
      data: shared,
    });

    const fundCreatedByManager = await getFundForManager(environment, {
      managerAddress: environment.account.address,
    });
    expect(fundCreatedByManager).toBe(shared.fund.address);

    shared.participation.initial = await getParticipation(environment, {
      fundAddress: shared.fund.address,
      investorAddress: environment.account.address,
    });
    expect(shared.participation.initial.personalStake.toNumber()).toBe(0);
    expect(shared.participation.initial.totalSupply.toNumber()).toBe(0);

    shared.initialCalculations = await performCalculations(environment, {
      fundAddress: shared.fund.address,
    });

    trace({
      message: `Pre contribution calculations- GAV: ${
        shared.initialCalculations.gav
      }, NAV: ${shared.initialCalculations.nav}, Share Price: ${
        shared.initialCalculations.sharePrice
      }, totalSupply: ${shared.initialCalculations.totalSupply}`,
      data: shared,
    });
    expect(shared.initialCalculations.sharePrice.toNumber()).toBe(1);
    expect(shared.initialCalculations.gav.toNumber()).toBe(0);

    shared.signature = await signOlympiadTermsAndConditions(environment);

    shared.registration = await registerForCompetition(environment, {
      fundAddress: shared.fund.address,
      signature: shared.signature,
      buyInValue: CONTRIBUTION_QUANTITY,
    });

    trace({
      message: `Registered for competition with registrand id ${
        shared.registration.registrandId
      }, fund address ${shared.registration.fundAddress} and manager address ${
        shared.registration.managerAddress
      }`,
      data: shared,
    });

    shared.midCalculations = await performCalculations(environment, {
      fundAddress: shared.fund.address,
    });

    trace({
      message: `Post contribution calculations- GAV: ${
        shared.midCalculations.gav
      }, NAV: ${shared.midCalculations.nav}, Share Price: ${
        shared.midCalculations.sharePrice
      }, totalSupply: ${shared.midCalculations.totalSupply}`,
      data: shared,
    });

    shared.fundMelonBalance = await getBalance(environment, {
      tokenSymbol: 'MLN-T',
      ofAddress: shared.fund.address,
    });
    trace({
      message: `Your Melon fund now has: ${shared.fundMelonBalance.toNumber()}`,
      data: shared,
    });
    expect(shared.fundMelonBalance.toNumber()).toBe(expectedMelonReceived);

    shared.participation.pre = await getParticipation(environment, {
      fundAddress: shared.fund.address,
      investorAddress: environment.account.address,
    });
    trace({
      message: `Number of shares owned before claiming reward ${shared.participation.pre.personalStake.toNumber()}`,
    });
    expect(shared.participation.pre.personalStake.toNumber()).toBe(0);
    expect(shared.participation.pre.totalSupply.toNumber()).toBe(
      shared.midCalculations.totalSupply.toNumber(),
    );

    shared.claimed = await claimReward(environment);
    trace({
      message: `${shared.claimed.shares} shares of the fund with address ${
        shared.claimed.fundAddress
      } were succesfully transfered to ${shared.claimed.registrant}`,
    });

    shared.participation.post = await getParticipation(environment, {
      fundAddress: shared.fund.address,
      investorAddress: environment.account.address,
    });
    trace({
      message: `Number of shares owned after claiming reward ${shared.participation.post.personalStake.toNumber()}`,
    });
    expect(shared.participation.post.personalStake.toNumber()).toBe(
      shared.midCalculations.totalSupply.toNumber(),
    );
    expect(shared.participation.post.totalSupply.toNumber()).toBe(
      shared.midCalculations.totalSupply.toNumber(),
    );

    shared.endCalculations = await performCalculations(environment, {
      fundAddress: shared.fund.address,
    });

    trace({
      message: `End calculations- GAV: ${shared.endCalculations.gav}\n NAV: ${
        shared.endCalculations.nav
      }, Share Price: ${shared.endCalculations.sharePrice}, totalSupply: ${
        shared.endCalculations.totalSupply
      }`,
      data: shared,
    });

    shared.RedemptionRequest = await redeemAllOwnedAssets(environment, {
      fundAddress: shared.fund.address,
      numShares: shared.participation.post.personalStake,
    });

    trace({
      message: `Redemption executed. shares: ${
        shared.RedemptionRequest.numShares
      }`,
      data: shared,
    });

    shared.participation.final = await getParticipation(environment, {
      fundAddress: shared.fund.address,
      investorAddress: environment.account.address,
    });

    trace({
      message: `Number of shares owned in the fund (should be 0): ${
        shared.participation.final.personalStake
      }`,
    });
    expect(shared.participation.final.personalStake.toNumber()).toBe(0);

    return true;
  },
  10 * 60 * 1000,
);
