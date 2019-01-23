import { constructEnvironment } from '@melonproject/protocol';
import { withDeployment } from '@melonproject/protocol/lib/utils/environment/withDeployment';
import { Tracks } from '@melonproject/protocol/lib/utils/environment/Environment';
import Wallet from 'ethers-wallet';

export const getEnvironment = logger => {
  const environment = constructEnvironment({
    logger,
    endpoint: process.env.ENDPOINT,
    track: process.env.TRACK as Tracks,
  });

  return withDeployment(environment);
};

export const getWallet = async () => {
  // Automatically log in to a wallet. Useful for development.
  const development = ['development', 'test'].includes(process.env
    .NODE_ENV as string);

  if (process.env.MNEMONIC && development) {
    return Wallet.Wallet.fromMnemonic(process.env.MNEMONIC);
  }

  return null;
};
