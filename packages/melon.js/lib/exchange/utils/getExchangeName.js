import addressBook from '@melonproject/smart-contracts/addressBook.json';
import getNetwork from '../../utils/environment/getNetwork';

const getExchangeName = async (environment, exchangeAddress) => {
  const network = await getNetwork(environment);

  switch (exchangeAddress.toLowerCase()) {
    case addressBook[network].MatchingMarket.toLowerCase():
      return 'MatchingMarket';

    case addressBook[network].ZeroExExchange.toLowerCase():
      return 'ZeroEx';

    case addressBook[network].KyberNetworkProxy.toLowerCase():
      return 'KyberNetwork';

    default:
      throw new Error(
        `Exchange name not found for exchange with address ${exchangeAddress}`,
      );
  }
};

export default getExchangeName;
