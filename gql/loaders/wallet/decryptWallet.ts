import Wallet from 'ethers-wallet';

const noop = (decrypted, encrypted) => {};
async function decryptWallet(wallet, password, callback = noop) {
  const decrypted = await Wallet.Wallet.fromEncryptedWallet(wallet, password);

  await callback(decrypted, wallet);
  return [decrypted.address];
}

export default decryptWallet;
