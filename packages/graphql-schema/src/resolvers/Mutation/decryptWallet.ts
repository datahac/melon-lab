import { decryptWallet } from '@melonproject/melon.js';

async function loadWallet(_, { wallet, password }) {
  const decryptedWallet = await decryptWallet(wallet, password);

  return {
    accountAddress: decryptedWallet.address,
    privateKey: decryptedWallet.privateKey,
    encryptedWallet: wallet,
  };
}

export default loadWallet;
