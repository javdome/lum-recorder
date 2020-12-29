const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

let isShownFace = false;

const createWindow = () => {
  // Create the main menu window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  });
  // Create the rounded face window.
  const winFace = new BrowserWindow({
    width: 250,
    height: 250,
    alwaysOnTop: true,
    maximizable:false,
    frame: false,
    show: false,
    transparent: true,
    autoHideMenuBar: true,
    // icon: __dirname +'/rounded-cam-icon.ico',
    webPreferences: {
      nodeIntegration: true
    }
  });
  winFace.setAlwaysOnTop(true, "screen-saver");
  winFace.setAutoHideMenuBar(true);

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'main-menu.html'));
  winFace.loadFile(path.join(__dirname, 'face.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //Toggles the visibility of the rounded face
  ipcMain.on('faceBtn-clicked', () => {
    if(!isShownFace) {
      winFace.show();
      isShownFace = true;
    } else {
      winFace.hide();
      isShownFace = false;
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
