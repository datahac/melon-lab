import { schema } from '~/shared/graphql/schema';
import { createContext } from '~/shared/graphql/schema/context';
import { getEnvironment, getWallet } from '~/shared/graphql/schema/environment';
import { createIpcExecutor, createSchemaLink } from '~/shared/graphql/server';
import { ipcMain } from 'electron';

export default async () => {
  const environment = await getEnvironment();
  const wallet = await getWallet();
  const context = await createContext(environment, wallet);
  const link = createSchemaLink({ schema, context });
  return createIpcExecutor({ link, ipc: ipcMain });
};
