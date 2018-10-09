import addressBook from '@melonproject/smart-contracts/addressBook.json';
import {
  ensure,
  getAddress,
  getNetwork,
  getVersionContract,
  getCompetitionComplianceContract,
} from '@melonproject/melon.js';
import prepareTransaction from './prepareTransaction';

const deriveComplianceAddress = (config, environment) => {
  if (environment.track === 'kovan-demo') {
    return config.noComplianceAddress;
  }

  if (environment.track === 'kovan-competition') {
    return config.competitionComplianceAddress;
  }

  if (environment.track === 'live') {
    return config.competitionComplianceAddress;
  }
};

const prepareSetupFundTransaction = async (
  environment,
  config,
  name,
  account,
  signature,
  exchanges = ['MatchingMarket', 'ZeroExExchange', 'KyberNetworkProxy'],
) => {
  const complianceAddress = deriveComplianceAddress(environment, config);
  const riskManagementAddress = config.riskManagementAddress;
  const versionContract = await getVersionContract(environment, config);
  const quoteAsset = getAddress(config, config.quoteAssetSymbol);
  const melonAsset = getAddress(config, config.melonAssetSymbol);
  const managementReward = 0;
  const performanceReward = 0;

  if (environment.track === 'kovan-competition' || environment.track === 'live') {
    const competitionComplianceContract = await getCompetitionComplianceContract(
      environment,
    );

    const isCompetitionAllowed = await competitionComplianceContract.instance.isCompetitionAllowed.call(
      {},
      [account],
    );

    ensure(
      isCompetitionAllowed,
      'Address not whitelisted cannot create a fund on this version',
    );
  }

  const isVersionShutDown = await versionContract.instance.isShutDown.call();
  ensure(!isVersionShutDown, 'Version is shut down.');

  const termsAndConditionsAreSigned = await versionContract.instance.termsAndConditionsAreSigned.call(
    { from: account },
    [signature.v, signature.r, signature.s],
  );

  ensure(
    termsAndConditionsAreSigned,
    'Invalid signature of terms and conditions on contract level',
  );

  const managerToFunds = await versionContract.instance.managerToFunds.call(
    {},
    [account],
  );

  ensure(
    managerToFunds === '0x0000000000000000000000000000000000000000',
    'Already have a fund',
  );

  const network = await getNetwork(environment);
  const exchangesFinal = exchanges.map(
    exchange => addressBook[network][exchange],
  );

  const params = [
    name,
    quoteAsset,
    managementReward,
    performanceReward,
    complianceAddress,
    riskManagementAddress,
    exchangesFinal,
    [melonAsset],
    signature.v,
    signature.r,
    signature.s,
  ];

  return prepareTransaction(account, versionContract, 'setupFund', params, environment);
};


export default prepareSetupFundTransaction;
