import path from 'path';
import electron from 'electron';
import prepareRenderer from 'electron-next';
import { format } from 'url';
import { resolve } from 'app-root-path';
import { prepareServer } from './graphql';
import { prepareDevelopment } from './utils/development';

electron.app.on('ready', async () => {
  const url = appUrl();
  const main = new electron.BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: !!isDev,
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  main.webContents.on('will-navigate', handleRedirect(main));
  main.webContents.on('new-window', handleRedirect(main));

  await Promise.all([
    prepareServer(),
    prepareRenderer('./renderer'),
    prepareDevelopment(main),
  ]);

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
    pathname: resolve('renderer/index.html'),
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
