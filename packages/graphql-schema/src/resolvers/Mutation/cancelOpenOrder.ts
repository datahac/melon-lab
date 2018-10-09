import { cancelOrder } from '@melonproject/melon.js';
import takeLast from '../../utils/takeLast';

async function cancelOpenOrder(
  _,
  { orderId, fundAddress, makerAssetSymbol, takerAssetSymbol },
  { streams },
) {
  const environment = await takeLast(streams.environment$);

  return (
    environment &&
    cancelOrder(environment, {
      identifier: orderId,
      fundAddress: fundAddress,
      makerAssetSymbol: makerAssetSymbol,
      takerAssetSymbol: takerAssetSymbol,
    })
  );
}

export default cancelOpenOrder;
