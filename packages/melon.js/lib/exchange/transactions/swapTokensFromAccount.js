// @flow
import getKyberProxyContract from '../contracts/getKyberProxyContract';
import findEventInLog from '../../utils/ethereum/findEventInLog';
import sendTransaction from '../../utils/parity/sendTransaction';
import approve from '../../assets/transactions/approve';
import toProcessable from '../../assets/utils/toProcessable';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';

/**
 * Cancel an order by `id`
 */
const swapTokensFromAccount = async (
  environment,
  { srcTokenSymbol, srcAmount, destTokenSymbol, minConversionRate },
) => {
  const config = await getConfig(environment);
  const srcToken = getAddress(config, srcTokenSymbol);
  const destToken = getAddress(config, destTokenSymbol);
  const kyberProxyContract = await getKyberProxyContract(environment);

  await approve(environment, {
    symbol: srcTokenSymbol,
    spender: kyberProxyContract.address,
    quantity: srcAmount,
  });

  const receipt = await sendTransaction(
    kyberProxyContract,
    'swapTokenToToken',
    [
      srcToken,
      toProcessable(config, srcAmount, srcTokenSymbol),
      destToken,
      minConversionRate,
    ],
    environment,
    {},
  );

  const executedEvent = findEventInLog(
    'ExecuteTrade',
    receipt,
    'Error during swap tokens execution',
  );

  return executedEvent;
};

export default swapTokensFromAccount;
