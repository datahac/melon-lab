import addressBook from '@melonproject/smart-contracts/addressBook.json';
import {
  ensure,
  getConfig,
  getAddress,
  getNetwork,
  getVersionContract,
  getCompetitionComplianceContract,
  signTermsAndConditions,
} from '@melonproject/melon.js';

const deriveComplianceAddress = (environment, config) => {
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

const createParameters = async (
  environment,
  wallet,
  name,
  exchanges = ['MatchingMarket', 'ZeroExExchange', 'KyberNetworkProxy'],
) => {
  const config = await getConfig(environment);
  const contract = await getVersionContract(environment, config);
  const complianceAddress = deriveComplianceAddress(environment, config);
  const riskManagementAddress = config.riskManagementAddress;
  const quoteAsset = getAddress(config, config.quoteAssetSymbol);
  const melonAsset = getAddress(config, config.melonAssetSymbol);
  const managementReward = 0;
  const performanceReward = 0;

  if (
    environment.track === 'kovan-competition' ||
    environment.track === 'live'
  ) {
    const competitionComplianceContract = await getCompetitionComplianceContract(
      environment,
    );

    const isCompetitionAllowed = await competitionComplianceContract.instance.isCompetitionAllowed.call(
      {},
      [wallet.address],
    );

    ensure(
      isCompetitionAllowed,
      'Address not whitelisted cannot create a fund on this version',
    );
  }

  const isVersionShutDown = await contract.instance.isShutDown.call();
  ensure(!isVersionShutDown, 'Version is shut down.');

  const signature = await signTermsAndConditions({
    ...environment,
    account: wallet,
  });
  const termsAndConditionsAreSigned = await contract.instance.termsAndConditionsAreSigned.call(
    { from: wallet.address },
    [signature.v, signature.r, signature.s],
  );

  ensure(
    termsAndConditionsAreSigned,
    'Invalid signature of terms and conditions on contract level',
  );

  const managerToFunds = await contract.instance.managerToFunds.call({}, [
    wallet.address,
  ]);

  ensure(
    managerToFunds === '0x0000000000000000000000000000000000000000',
    'Already have a fund',
  );

  const network = await getNetwork(environment);
  const exchangesFinal = exchanges.map(
    exchange => addressBook[network][exchange],
  );

  const parameters = [
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

  return parameters;
};

export default createParameters;
