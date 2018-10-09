function fundTotalSupply(contract) {
  return contract.instance.totalSupply.call();
}

export default fundTotalSupply;
