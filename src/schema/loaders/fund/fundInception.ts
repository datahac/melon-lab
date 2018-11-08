function fundInception(contract) {
  return contract.instance.getCreationTime.call();
}

export default fundInception;
