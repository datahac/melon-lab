import schema, { createContext } from '@melonproject/graphql-schema';
import { getConfig, getParityProvider } from '@melonproject/melon.js';
import { ipcMain } from 'electron';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from '~/electron/graphql/server';

export default async () => {
  const pubsub = new PubSub();
  const track = process.env.TRACK || 'kovan-demo';
  const environment = {
    ...(await getParityProvider(process.env.JSON_RPC_ENDPOINT)),
    track,
  };

  // TODO: For some reason, getConfig is reaaaallllly slow.
  const config = await getConfig(environment);
  const context = createContext(environment, config, pubsub);

  return new SubscriptionServer(
    {
      channel: 'graphql',
      messenger: ipcMain,
    },
    {
      schema,
      context,
    },
  );
};
