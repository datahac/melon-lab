import {
  encryptWallet,
  importWalletFromMnemonic,
} from '@melonproject/melon.js';

const noop = (decrypted, encrypted) => {};
async function restoreWallet(mnemonic, password, callback = noop) {
  const decrypted = await importWalletFromMnemonic(mnemonic);
  const encrypted = await encryptWallet(decrypted, password);
  await callback(decrypted, encrypted);

  return [decrypted.address];
}

export default restoreWallet;
