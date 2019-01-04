import * as R from 'ramda';
import { managersToRoutes } from '@melonproject/protocol';
import { isEmptyAddress } from '@melonproject/protocol';

async function fundSetup(environment, managerAddress) {
  const routes = await managersToRoutes(
    environment,
    environment.deployment.melonContracts.version,
    managerAddress,
  );

  const isValidAddress = address => {
    if (isEmptyAddress(address)) {
      return null;
    }
    return address;
  };

  return {
    accountingAddress: isValidAddress(routes.accounting),
    feeManagerAddress: isValidAddress(routes.feeManager),
    participationAddress: isValidAddress(routes.participation),
    policyManagerAddress: isValidAddress(routes.policyManager),
    sharesAddress: isValidAddress(routes.shares),
    tradingAddress: isValidAddress(routes.trading),
    vaultAddress: isValidAddress(routes.vault),
    registryAddress: isValidAddress(routes.registry),
    versionAddress: isValidAddress(routes.version),
  };
}

export default R.curryN(2, fundSetup);
