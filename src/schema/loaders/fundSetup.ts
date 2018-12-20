import * as R from 'ramda';
import { managersToRoutes } from '@melonproject/protocol';

async function fundSetup(environment, managerAddress) {
  const routes = await managersToRoutes(
    environment,
    environment.deployment.melonContracts.version,
    managerAddress,
  );
  return {
    accountingAddress: routes.accounting,
    feeManagerAddress: routes.feeManager,
    participationAddress: routes.participation,
    policyManagerAddress: routes.policyManager,
    sharesAddress: routes.shares,
    tradingAddress: routes.trading,
    vaultAddress: routes.vault,
    registryAddress: routes.registry,
    versionAddress: routes.version,
  };
}

export default R.curryN(2, fundSetup);
