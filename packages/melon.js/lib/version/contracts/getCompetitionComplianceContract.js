import CompetitionComplianceAbi from '@melonproject/smart-contracts/out/compliance/CompetitionCompliance.abi.json';
import getConfig from '../../version/calls/getConfig';

/**
 * Get deployed version contract instance
 */
const getVersionContract = async environment => {
  const config = await getConfig(environment);
  return environment.api.newContract(
    CompetitionComplianceAbi,
    config.competitionComplianceAddress,
  );
};

export default getVersionContract;
