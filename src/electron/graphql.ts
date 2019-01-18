import { SchemaLink } from 'apollo-link-schema';
import { schema } from '~/schema';
import { createContext } from '~/schema/context';
import { getEnvironment, getWallet } from '~/schema/environment';
import { createIpcExecutor } from '~/shared/graphql/server';
import { ipcMain } from 'electron';

export default async () => {
  const context = await createContext(
    await getEnvironment(),
    await getWallet(),
  );
  const link = new SchemaLink({ schema, context });
  return createIpcExecutor({ link, ipc: ipcMain });
};
