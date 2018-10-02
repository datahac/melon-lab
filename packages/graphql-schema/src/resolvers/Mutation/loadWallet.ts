import { encryptWallet, decryptWallet } from '@melonproject/melon.js';

async function loadWallet(parent, args, context) {
  const decryptedWallet = await decryptWallet(args.file, args.password);
  const encryptedWallet = await encryptWallet(decryptedWallet, args.password);
  return {
    ...decryptedWallet,
    encryptedWallet,
  };
}

export default loadWallet;
