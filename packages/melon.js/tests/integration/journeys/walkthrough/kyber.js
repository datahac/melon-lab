import BigNumber from 'bignumber.js';
import getQuoteAssetSymbol from '../../../../lib/pricefeeds/calls/getQuoteAssetSymbol';
import getPrice from '../../../../lib/pricefeeds/calls/getPrice';
import getConfig from '../../../../lib/version/calls/getConfig';
import signTermsAndConditions from '../../../../lib/version/transactions/signTermsAndConditions';
import setupFund from '../../../../lib/version/transactions/setupFund';
import getNativeAssetSymbol from '../../../../lib/version/calls/getNativeAssetSymbol';
import hasRecentPrice from '../../../../lib/pricefeeds/calls/hasRecentPrice';
import getParityProvider from '../../../../lib/utils/parity/getParityProvider';
import getOrderbook from '../../../../lib/exchange/calls/getOrderbook';
import getKyberOrderBook from '../../../../lib/exchange/calls/getKyberOrderBook';
import getConversionRate from '../../../../lib/exchange/calls/getConversionRate';
import getKyberProxyContract from '../../../../lib/exchange/contracts/getKyberProxyContract';
import importWalletFromMnemonic from '../../../../lib/utils/wallet/importWalletFromMnemonic';
import setEnvironment from '../../../../lib/utils/environment/setEnvironment';
import getEnvironment from '../../../../lib/utils/environment/getEnvironment';
import getFundForManager from '../../../../lib/version/calls/getFundForManager';
import shutDownFund from '../../../../lib/fund/transactions/shutDownFund';
import getVersionContract from '../../../../lib/version/contracts/getVersionContract';
import transferTo from '../../../../lib/assets/transactions/transferTo';
import toReadable from '../../../../lib/assets/utils/toReadable';
import swapTokens from '../../../../lib/fund/transactions/swapTokens';
import swapTokensFromAccount from '../../../../lib/exchange/transactions/swapTokensFromAccount';
import trace from '../../../../lib/utils/generic/trace';

const randomString = (length = 4) =>
  Math.random()
    .toString(36)
    .substr(2, length);

fit('swapTokens from account', async () => {
  const { providerType, api } = await getParityProvider();
  const wallet = importWalletFromMnemonic('dinosaur pulse rice lumber machine entry tackle off require draw edge almost');

  setEnvironment({ api, account: wallet, providerType });
  const environment = getEnvironment();
  const config = await getConfig(environment);

  // console.log((await getKyberOrderBook(environment, { baseTokenSymbol: "WETH-T", quoteTokenSymbol: "DAI-T" })));

  const srcAmount = 0.1;
  const [, slippageRate] = await getConversionRate(environment, { srcTokenSymbol: "WETH-T", destTokenSymbol: "DAI-T", srcAmount });
  const expectedDestAmount = srcAmount * slippageRate;

  const actualDestAmount = await swapTokensFromAccount(environment, { srcTokenSymbol: "WETH-T", srcAmount: srcAmount, destTokenSymbol: "DAI-T", minConversionRate: slippageRate });

  expect(Number(actualDestAmount.params.actualDestAmount.value)).toBeGreaterThan(
    expectedDestAmount,
  );
},  10 * 60 * 1000);

fit('Create fund, swapTokens from WETH to DAI, swap back', async () => {

  const environment = getEnvironment();
  const config = await getConfig(environment);

  const signature = await signTermsAndConditions(environment);
  const shared = {};

  shared.fundName = randomString();
  const versionContract = await getVersionContract(environment);
  let managerToFunds = await versionContract.instance.managerToFunds.call(
    {},
    [environment.account.address],
  );

  if (managerToFunds !== '0x0000000000000000000000000000000000000000') {
    shared.fund = { address: managerToFunds };
  }
  else {
    shared.fund = await setupFund(environment, {
      name: shared.fundName,
      signature,
      exchangeNames: ['KyberNetwork'],
    });
  }

  const srcToken = "WETH-T";
  const destToken = "DAI-T"
  const srcAmount = 0.1;
  const [, slippageRate] = await getConversionRate(environment, { srcTokenSymbol: srcToken, destTokenSymbol: destToken, srcAmount });
  const minDestAmount = toReadable(config, slippageRate.mul(srcAmount), destToken);
  await transferTo(environment, { symbol: srcToken, toAddress: shared.fund.address, quantity: srcAmount });
  const eventLog = await swapTokens(environment, {
    fundAddress: shared.fund.address, exchangeAddress: config.kyberNetworkAddress, srcTokenSymbol: srcToken,
    destTokenSymbol: destToken,
    srcAmount: srcAmount,
    destAmount: minDestAmount
  });
  const actualDestAmount = toReadable(config, eventLog.params.actualDestAmount.value, destToken);
  expect(Number(actualDestAmount)).toBeGreaterThan(
    minDestAmount,
  );
  trace({ message: `Sold  ${srcAmount} ${srcToken} and bought ${actualDestAmount} ${destToken}` });

  // Swap back the swapped tokens
  const swapBackMinDestAmount = srcAmount - (0.2 * srcAmount);
  const swapBackLog = await swapTokens(environment, { fundAddress: shared.fund.address, exchangeAddress: config.kyberNetworkAddress,  srcTokenSymbol: destToken,
      destTokenSymbol: srcToken,
      srcAmount: actualDestAmount,
      destAmount: swapBackMinDestAmount });
  const swapBackActualDestAmount = toReadable(config, swapBackLog.params.actualDestAmount.value, srcToken);

  expect(Number(swapBackActualDestAmount)).toBeGreaterThan(
      swapBackMinDestAmount,
  );
  trace({ message: `Sold  ${actualDestAmount} ${destToken} and bought ${swapBackActualDestAmount} ${srcToken}` });

}, 10 * 60 * 1000);
