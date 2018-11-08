import Utils from 'ethers-utils';

async function fundName(contract) {
  const bytes = await contract.instance.getName.call();

  return Utils.toUtf8String(Utils.stripZeros(bytes.reverse()).reverse());
}

export default fundName;
