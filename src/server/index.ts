require('dotenv').config({
  path: require('find-up').sync(['.env', '.env.defaults']),
});

import schema, { createContext } from '~/schema';
import path from 'path';
import fs from 'fs';
import next from 'next';
import compression from 'compression';
import * as express from 'express';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import Wallet from 'ethers-wallet';
import Ganache from '@melonproject/ganache-cli';
import { createQuantity } from '@melonproject/token-math/quantity';
import { createPrice } from '@melonproject/token-math/price';
import {
  constructEnvironment,
  deployThirdParty,
  deploySystem,
  deployAllContractsConfig,
  update,
} from '@melonproject/protocol';
import Web3Accounts from 'web3-eth-accounts';

import { makeOrderFromAccountOasisDex } from '@melonproject/protocol/lib/contracts/exchanges/transactions/makeOrderFromAccountOasisDex';

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

  const { melonContracts, thirdPartyContracts } = withDeployment.deployment;

  const { priceSource } = melonContracts;
  const tokens = thirdPartyContracts.tokens;
  const [ethToken, mlnToken] = tokens;

  const mlnPrice = createPrice(
    createQuantity(mlnToken, '1'),
    createQuantity(ethToken, '2'),
  );

  const ethPrice = createPrice(
    createQuantity(ethToken, '1'),
    createQuantity(ethToken, '1'),
  );

  await update(withDeployment, priceSource, [ethPrice, mlnPrice]);

  const matchingMarketAddress =
    withDeployment.deployment.exchangeConfigs.MatchingMarket.exchange;
  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: createQuantity(mlnToken, 1),
    sell: createQuantity(ethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: createQuantity(mlnToken, 2),
    sell: createQuantity(ethToken, 1),
  });

  await makeOrderFromAccountOasisDex(withDeployment, matchingMarketAddress, {
    buy: createQuantity(mlnToken, 3),
    sell: createQuantity(ethToken, 1),
  });

  return {
    ...environment,
    deployment: withDeployment.deployment,
  };
};

const getEnvironment = async (track: string, endpoint?: string) => {
  if (process.env.NODE_ENV !== 'development' && !endpoint) {
    throw new Error('Missing endpoint.');
  }

  if (process.env.NODE_ENV === 'development' && !endpoint) {
    return getTestEnvironment(track);
  }

  return constructEnvironment({
    endpoint: endpoint && endpoint.replace('http', 'ws'),
    track,
  });
};

(async () => {
  const development = process.env.NODE_ENV === 'development';
  const playground = JSON.parse(process.env.GRAPHQL_PLAYGROUND || 'false');
  const tracing = JSON.parse(process.env.GRAPHQL_DEBUG || 'false');
  const debug = JSON.parse(process.env.GRAPHQL_TRACING || 'false');
  const port = parseInt(process.env.PORT as string, 10) || 3000;
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_LOCAL || process.env.JSON_RPC_REMOTE;
  const environment = await getEnvironment(track, endpoint);

  // Bootstrap the next.js environment.
  const renderer = next({ dev: development, dir: './src' });
  await renderer.prepare();

  // Automatically log in to a wallet. Useful for development.
  const wallet =
    process.env.NODE_ENV === 'development' &&
    !!JSON.parse(process.env.SERVER_SIDE_WALLET || 'false')
      ? Wallet.Wallet.fromMnemonic(mnemonic)
      : null;

  // Bootstrap the graphql server.
  const context = await createContext(environment, wallet);
  const apollo = new ApolloServer({
    schema,
    context,
    tracing: development || tracing,
    debug: development || debug,
    introspection: development || playground,
    playground: development || playground,
    subscriptions: {
      path: '/api',
    },
  });

  // Build the server.
  const handle = renderer.getRequestHandler();
  const app = express();
  const server = createServer(app);

  app.use(compression());

  // Register the graphql routes.
  apollo.applyMiddleware({
    app,
    path: '/api',
    bodyParserConfig: true,
    disableHealthCheck: true,
  });

  // Register the next.js routes.
  app.get('*', (req, res) => {
    res.context = context;
    res.schema = schema;

    return handle(req, res);
  });

  apollo.installSubscriptionHandlers(server);

  server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
