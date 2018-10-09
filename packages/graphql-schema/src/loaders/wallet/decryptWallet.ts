import { decryptWallet as doDecryptWallet } from '@melonproject/melon.js';

async function decryptWallet(wallet, password) {
  const decryptedWallet = await doDecryptWallet(wallet, password);

  return {
    accountAddress: decryptedWallet.address,
    privateKey: decryptedWallet.privateKey,
    encryptedWallet: wallet,
  };
}

export default decryptWallet;
