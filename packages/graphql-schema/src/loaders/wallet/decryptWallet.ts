import { decryptWallet as doDecryptWallet } from '@melonproject/melon.js';

const noop = (decrypted, encrypted) => {};
async function decryptWallet(wallet, password, callback = noop) {
  const decrypted = await doDecryptWallet(wallet, password);
  await callback(decrypted, wallet);

  return [decrypted.address];
}

export default decryptWallet;
