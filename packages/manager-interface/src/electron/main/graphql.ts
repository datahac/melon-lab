import schema, { createContext } from '@melonproject/graphql-schema';
import { ipcMain } from 'electron';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionServer } from '~/electron/graphql/server';

export default async () => {
  const pubsub = new PubSub();
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_ENDPOINT;
  const context = await createContext(track, endpoint, pubsub);

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
