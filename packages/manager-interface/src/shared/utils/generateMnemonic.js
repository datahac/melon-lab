import { createWallet } from '@melonproject/melon.js';

const generateMnemonic = () => createWallet().mnemonic;

export default generateMnemonic;
