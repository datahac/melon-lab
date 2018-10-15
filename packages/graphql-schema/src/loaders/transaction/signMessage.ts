import Wallet from 'ethers-wallet';

function signMessage(privateKey, message) {
  const wallet = new Wallet(privateKey);
  const signature = wallet.signMessage(message);
  if (!Wallet.Wallet.verifyMessage(message, signature)) {
    throw new Error('Signature invalid.');
  }

  return signature;
}

export default signMessage;
