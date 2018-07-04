// @flow
import addressBook from '@melonproject/smart-contracts/addressBook.json';
import exchangeInfo from '@melonproject/smart-contracts/utils/info/exchangeInfo';

import getNativeAssetSymbol from './getNativeAssetSymbol';
import getNetwork from '../../utils/environment/getNetwork';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';
import getWhiteListedAssets from '../../assets/utils/getWhiteListedAssets';

import type { Address } from '../../assets/schemas/Address';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Asset config
 */
export type AssetConfig = {
  address: Address,
  decimal: number,
  name: string,
  symbol: TokenSymbol,
  url: string,
};

/**
 * Config retrieved from the version
 */
export type Config = {
  assets: Array<AssetConfig>,
  onlyManagerAddress: Address,
  noComplianceCompetitionAddress: Address,
  competitionComplianceAddress: Address,
  matchingMarketAddress: Address,
  matchingMarketAdapter: Address,
  zeroExV1Address: Address,
  zeroExV1AdapterAddress: Address,
  nativeAssetSymbol: TokenSymbol,
  canonicalPriceFeedAddress: Address,
  stakingPriceFeedAddress: Address,
  quoteAssetSymbol: TokenSymbol,
  rankingAddress: Address,
  riskManagementAddress: Address,
  versionAddress: Address,
  governanceAddress: Address,
};

let config: Config;

/**
 * Get config from deployed version contract
 */
const getConfig = async (environment, optionalNetwork): Promise<Config> => {
  if (config) return config;

  const network = optionalNetwork
    ? optionalNetwork.toLowerCase()
    : await getNetwork(environment);
  config = {
    onlyManagerAddress: addressBook[network].OnlyManager,
    competitionComplianceAddress: addressBook[network].CompetitionCompliance,
    matchingMarketAddress: addressBook[network].MatchingMarket,
    matchingMarketAdapter: addressBook[network].MatchingMarketAdapter,
    zeroExV1Address: addressBook[network].ZeroExExchange,
    zeroExV1AdapterAddress: addressBook[network].ZeroExV1Adapter,
    canonicalPriceFeedAddress: addressBook[network].CanonicalPriceFeed,
    rankingAddress: addressBook[network].FundRanking,
    riskManagementAddress: addressBook[network].RMMakeOrders,
    versionAddress: addressBook[network].Version,
    governanceAddress: addressBook[network].Governance,
    olympiadAddress: addressBook[network].Competition,
  };

  // HACK: Define config first so that inside these next async functions,
  // getConfig() already returns the addresses to avoid an infinite loop
  config.assets = await getWhiteListedAssets(environment, network);
  config.nativeAssetSymbol = await getNativeAssetSymbol(environment);
  config.quoteAssetSymbol = await getQuoteAssetSymbol(environment);
  config.melonAssetSymbol = network === 'kovan' ? 'MLN-T' : 'MLN';

  return config;
};

export default getConfig;
