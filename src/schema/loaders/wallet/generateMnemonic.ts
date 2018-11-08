import { createWallet } from '@melonproject/melon.js';

async function generateMnemonic() {
  const wallet = await createWallet();
  return wallet && wallet.mnemonic;
}

export default generateMnemonic;
