// @flow
import findEventInLog from '../../utils/ethereum/findEventInLog';
import getAddress from '../../assets/utils/getAddress';
import getConfig from '../../version/calls/getConfig';
import sendTransaction from '../../utils/parity/sendTransaction';
import toProcessable from '../../assets/utils/toProcessable';
import getExchangeIndex from '../calls/getExchangeIndex';

import type { Environment } from '../../utils/environment/Environment';
import type { Order } from '../../exchange/schemas/Order';

const callOnExchange = async (
  environment: Environment,
  {
    fundContract,
    exchangeAddress,
    method,
    orderAddresses: [
      maker = '0x0000000000000000000000000000000000000000',
      taker = '0x0000000000000000000000000000000000000000',
      makerAsset,
      takerAsset,
      feeRecipient = '0x0000000000000000000000000000000000000000',
    ],
    orderValues: [
      makerQuantity,
      takerQuantity,
      makerFee = '0',
      takerFee = '0',
      timestamp = '0',
      salt = '0x0',
      fillTakerTokenAmount,
      dexySignatureMode = 0,
    ],
    identifier = 0,
    signature,
  },
): Promise<Order> => {
  const config = await getConfig(environment);

  const exchangeIndex = await getExchangeIndex(
    environment,
    exchangeAddress,
    fundContract.address,
  );

  const v = signature.v ? signature.v : 0;
  const r = signature.r ? signature.r : '0x0';
  const s = signature.s ? signature.s : '0x0';

  const args = [
    exchangeIndex,
    method,
    [
      maker,
      taker,
      getAddress(config, makerAsset),
      getAddress(config, takerAsset),
      feeRecipient,
    ],
    [
      toProcessable(config, makerQuantity, makerAsset).toString(),
      toProcessable(config, takerQuantity, takerAsset).toString(),
      makerFee,
      takerFee,
      timestamp,
      salt,
      toProcessable(config, fillTakerTokenAmount, takerAsset).toString(),
      dexySignatureMode,
    ],
    `0x${Number(identifier)
      .toString(16)
      .padStart(64, '0')}`,
    v,
    r,
    s,
  ];
  const receipt = await sendTransaction(
    fundContract,
    'callOnExchange',
    args,
    environment,
    {},
  );

  const updateLog = findEventInLog('OrderUpdated', receipt);
  return updateLog;
};

export default callOnExchange;
