import {
  encryptWallet,
  importWalletFromMnemonic,
} from '@melonproject/melon.js';

async function restoreWallet(mnemonic, password) {
  const decryptedWallet = await importWalletFromMnemonic(mnemonic);
  const encryptedWallet = await encryptWallet(decryptedWallet, password);

  return {
    accountAddress: decryptedWallet.address,
    privateKey: decryptedWallet.privateKey,
    encryptedWallet,
  };
}

export default restoreWallet;
