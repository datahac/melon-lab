import { createWallet } from '@melonproject/melon.js';

async function mnemonic(parent, args, context) {
  const generateMnemonic = await createWallet().mnemonic;
  return generateMnemonic;
}

export default mnemonic;
