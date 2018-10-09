function fundOwner(contract) {
  return contract.instance.owner.call();
}

export default fundOwner;
