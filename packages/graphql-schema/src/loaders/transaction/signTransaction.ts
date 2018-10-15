import Wallet from 'ethers-wallet';

function signTransaction(privateKey, rawTransaction) {
  // Sign transaction object with Wallet instance.
  const wallet = new Wallet(privateKey);
  const signedTransaction = wallet.sign(rawTransaction);
  return signedTransaction;
}

export default signTransaction;
