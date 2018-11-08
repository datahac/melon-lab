import schema, { createContext } from '@melonproject/graphql-schema';
import { ipcMain } from 'electron';
import { SubscriptionServer } from '~/electron/graphql/server';

export default async () => {
  const track = process.env.TRACK || 'kovan-demo';
  const endpoint = process.env.JSON_RPC_REMOTE;
  const context = await createContext(track, endpoint);

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
