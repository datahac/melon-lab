import path from 'path';
import electron from 'electron';
import prepareRenderer from 'electron-next';
import { format } from 'url';
import { resolve } from 'app-root-path';
import { prepareServer } from './graphql';
import { prepareDevelopment } from './utils/development';

import isDev from 'electron-is-dev';

console.log(
  JSON.stringify(
    {
      isDev,
      app: Object.keys(electron.app),
      env: process.env,
      isPackaged: (electron.app as any).isPackaged,
    },
    null,
    2,
  ),
);

electron.app.on('ready', async () => {
  const url = appUrl();
  const main = new electron.BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: process.env.NODE_ENV === 'development',
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  main.webContents.on('will-navigate', handleRedirect(main));
  main.webContents.on('new-window', handleRedirect(main));

  await prepareServer();
  await prepareRenderer({
    development: './renderer',
    production: './',
  });

  await prepareDevelopment(main);
  main.loadURL(url);
});

electron.app.on('window-all-closed', () => {
  electron.app.quit();
});

const appUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000';
  }

  return format({
    pathname: resolve('out/index.html'),
    protocol: 'file:',
    slashes: true,
  });
};

const handleRedirect = window => (event, url) => {
  if (url !== window.webContents.getURL()) {
    event.preventDefault();
    electron.shell.openExternal(url);
  }
};
