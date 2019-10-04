import { constructEnvironment } from '@melonproject/protocol';
import { withDeployment } from '@melonproject/protocol/lib/utils/environment/withDeployment';
import { Tracks, CurriedLogger } from '@melonproject/protocol/lib/utils/environment/Environment';
import Wallet from 'ethers-wallet';

export const createEnvironment = async (provider: any, logger?: CurriedLogger) => {
  const environment = constructEnvironment({
    logger,
    provider,
    track: process.env.TRACK as Tracks,
  });

  await environment.eth.net.getId();
  return withDeployment(environment);
};

export const getWallet = async () => {
  // Automatically log in to a wallet. Useful for development.
  const development = ['development', 'test'].includes(process.env.NODE_ENV as string);

  if (process.env.MNEMONIC && development) {
    return Wallet.Wallet.fromMnemonic(process.env.MNEMONIC);
  }

  if (process.env.PRIVATE_KEY && development) {
    return new Wallet.Wallet(process.env.PRIVATE_KEY);
  }

  return null;
};
