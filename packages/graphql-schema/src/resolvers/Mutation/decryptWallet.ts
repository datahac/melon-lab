import { decryptWallet } from '@melonproject/melon.js';

async function loadWallet(parent, args, context) {
  const decryptedWallet = await decryptWallet(args.wallet, args.password);

  return {
    accountAddress: decryptedWallet.address,
    privateKey: decryptedWallet.privateKey,
    encryptedWallet: args.wallet,
  };
}

export default loadWallet;
