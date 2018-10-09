function fundCalculations(contract) {
  return contract.instance.performCalculations.call();
}

export default fundCalculations;
