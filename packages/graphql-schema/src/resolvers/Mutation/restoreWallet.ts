import {
  encryptWallet,
  importWalletFromMnemonic,
} from '@melonproject/melon.js';

async function restoreWallet(parent, args, context) {
  const decryptedWallet = await importWalletFromMnemonic(args.mnemonic);
  const encryptedWallet = await encryptWallet(decryptedWallet, args.password);
  return {
    accountAddress: decryptedWallet.address,
    privateKey: decryptedWallet.privateKey,
    encryptedWallet,
  };
}

export default restoreWallet;
