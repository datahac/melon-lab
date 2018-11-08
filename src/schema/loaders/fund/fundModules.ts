function getFundModules(contract) {
  return contract.instance.getModules.call();
}

export default getFundModules;
