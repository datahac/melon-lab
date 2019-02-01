const installExtension = async extension => {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  try {
    const dependency = require('electron-devtools-installer');
    const install = dependency.default;
    const name = await install(dependency[extension]);
    console.log('Added Extension: %s', name);
  } catch (error) {
    console.error('Failed to add extension: %s', error);
  }
};

export const prepareDevelopment = async window => {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  await installExtension('REACT_DEVELOPER_TOOLS');
  await installExtension('APOLLO_DEVELOPER_TOOLS');

  try {
    require('devtron').install();
    require('electron-debug')({ enable: true });

    window.webContents.once('dom-ready', () => {
      window.webContents.openDevTools();
    });
  } catch (error) {
    console.error('Failed to enable debugging mode.');
  }
};
