import Wallet from 'ethers-wallet';

const noop = (decrypted, encrypted) => {};
async function restoreWallet(mnemonic, password, callback = noop) {
  const decrypted = Wallet.Wallet.fromMnemonic(mnemonic);
  const encrypted = await decrypted.encrypt(password);
  await callback(decrypted, encrypted);

  return [decrypted.address];
}

export default restoreWallet;
