import Wallet from 'ethers-wallet';
import bip39 from 'bip39';

async function generateMnemonic() {
  const mnemonic = bip39.generateMnemonic();
  const wallet = new Wallet.Wallet.fromMnemonic(mnemonic);
  return wallet.mnemonic;
}

export default generateMnemonic;
