import path from 'path';
import electron, { MenuItemConstructorOptions } from 'electron';
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

  createMenu();

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

const createMenu = () => {
  const application: MenuItemConstructorOptions = {
    label: 'Application',
    submenu: [
      {
        label: 'About Application',
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        role: 'quit',
      },
    ],
  };

  const edit: MenuItemConstructorOptions = {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo',
      },
      {
        type: 'separator',
      },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectAll',
      },
    ],
  };

  const template = [application, edit];

  electron.Menu.setApplicationMenu(electron.Menu.buildFromTemplate(template));
};
