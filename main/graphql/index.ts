import { ipcMain } from 'electron';
import {
  createIpcExecutor,
  createSchemaLink,
} from 'graphql-transport-electron';
import { schema } from './schema';
import { createContext } from './context';
import { getEnvironment, getWallet } from './environment';

export const prepareServer = async () => {
  const logger =
    process.env.NODE_ENV === 'production'
      ? undefined
      : require('@melonproject/protocol/lib/tests/utils/testLogger').testLogger;

  const wallet = await getWallet();
  const environment = await getEnvironment(logger);
  const context = await createContext(environment, wallet);
  const link = createSchemaLink({ schema, context });
  createIpcExecutor({ link, ipc: ipcMain });
};
