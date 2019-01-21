import { ipcMain } from 'electron';
import {
  createIpcExecutor,
  createSchemaLink,
} from 'graphql-transport-electron';
import { schema } from './schema';
import { createContext } from './context';
import { getEnvironment, getWallet } from './environment';

export const prepareServer = async () => {
  const wallet = await getWallet();
  const environment = await getEnvironment();
  const context = await createContext(environment, wallet);
  const link = createSchemaLink({ schema, context });
  createIpcExecutor({ link, ipc: ipcMain });
};
