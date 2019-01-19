import path from 'path';
import fs from 'fs';
import Wallet from 'ethers-wallet';
import Ganache from '@melonproject/ganache-cli';
import * as Tm from '@melonproject/token-math';
import {
  getTokenBySymbol,
  constructEnvironment,
  deployThirdParty,
  deploySystem,
  deployAllContractsConfig,
  update,
} from '@melonproject/protocol';
import { makeOrderFromAccountOasisDex } from '@melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex';
import Web3Accounts from 'web3-eth-accounts';

const mnemonic =
  'exhibit now news planet fame thank swear reform tilt accident bitter axis';

const getTestEnvironment = async (track: string) => {
  const chainPath = path.resolve(process.cwd(), '.chain');
  const databasePath = path.join(chainPath, 'db');

  if (!fs.existsSync(chainPath)) {
    fs.mkdirSync(chainPath);
    fs.mkdirSync(databasePath);
  }

  const provider = Ganache.provider({
    gasLimit: '0x7a1200',
    default_balance_ether: 10000000000000,
    // db_path: path.resolve(__dirname, '.chain'),
    total_accounts: 10,
    mnemonic,
    logger: console,
    db_path: databasePath,
  });

  const deploymentPath = path.join(chainPath, 'deployment.json');
  const environment = constructEnvironment({
    provider,
    track,
    deployment:
      fs.existsSync(deploymentPath) &&
      JSON.parse(fs.readFileSync(deploymentPath).toString()),
  });

  if (environment && environment.deployment) {
    return environment;
  }

  const wallet = Wallet.Wallet.fromMnemonic(mnemonic);
  const accounts = new Web3Accounts(environment.eth.currentProvider);
  const signTransaction = transaction =>
    accounts
      .signTransaction(transaction, wallet.privateKey)
      .then(t => t.rawTransaction);

  const withWallet = {
    ...environment,
    wallet: {
      ...wallet,
      signTransaction,
    },
  };

  const thirdParty = await deployThirdParty(withWallet);
  const withDeployment = await deploySystem(
    withWallet,
    thirdParty,
    deployAllContractsConfig,
  );

  fs.writeFileSync(deploymentPath, JSON.stringify(withDeployment.deployment));

  const { melonContracts } = withDeployment.deployment;
  const { priceSource } = melonContracts;
  const wethToken = getTokenBySymbol(withDeployment, 'WETH');
  const mlnToken = getTokenBySymbol(withDeployment, 'MLN');

  const mlnPrice = Tm.createPrice(
    Tm.createQuantity(mlnToken, '1'),
    Tm.createQuantity(wethToken, '2'),
  );

  const ethPrice = Tm.createPrice(
    Tm.createQuantity(wethToken, '1'),
    Tm.createQuantity(wethToken, '1'),
  );

  await update(withDeployment, priceSource, [ethPrice, mlnPrice]);

  const matchingMarketAddress =
    withDeployment.deployment.exchangeConfigs.MatchingMarket.exchange;

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(mlnToken, 1),
    sell: Tm.createQuantity(wethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(mlnToken, 2),
    sell: Tm.createQuantity(wethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(mlnToken, 3),
    sell: Tm.createQuantity(wethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(mlnToken, 4),
    sell: Tm.createQuantity(wethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(mlnToken, 6.5),
    sell: Tm.createQuantity(wethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(mlnToken, 3.7),
    sell: Tm.createQuantity(wethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(wethToken, 2),
    sell: Tm.createQuantity(mlnToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(wethToken, 3),
    sell: Tm.createQuantity(mlnToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: Tm.createQuantity(wethToken, 3.5),
    sell: Tm.createQuantity(mlnToken, 1),
  });

  return {
    ...environment,
    deployment: withDeployment.deployment,
  };
};

export const getEnvironment = async () => {
  const track = process.env.TRACK;
  const environment = await getTestEnvironment(track);
  return environment;
};

export const getWallet = async () => {
  // Automatically log in to a wallet. Useful for development.
  const wallet =
    process.env.NODE_ENV === 'development'
      ? Wallet.Wallet.fromMnemonic(mnemonic)
      : null;

  return wallet;
};
