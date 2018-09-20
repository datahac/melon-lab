import ensure from '../../utils/generic/ensure';
import getComplianceContract from '../contracts/getComplianceContract'
/**
 * Test if subscribe request is permitted
 */
const isInvestmentPermittedAndAllowed = async (
  environment,
  { fundContract, asset, who, giveQuantity, shareQuantity },
) => {
  ensure(
    await fundContract.instance.isInvestAllowed.call({}, [asset]),
    'Subscriptions in this asset are disabled by the fund manager',
  );
  const complianceContract = await getComplianceContract(environment, fundContract)
  ensure(
    await complianceContract.instance.isInvestmentPermitted.call({}, [who, giveQuantity, shareQuantity]),
    'Subscriptions with this address are denied.',
  );

};

export default isInvestmentPermittedAndAllowed;
