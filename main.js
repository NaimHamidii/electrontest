const { app, BrowserWindow, ipcMain, Notification } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');

function createWindow(){
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    mainWindow.loadFile('index.html');

    mainWindow.once('ready-to-show', () => {
        autoUpdater.checkForUpdatesAndNotify();
    });

    win.webContents.openDevTools();
}

app.whenReady()
    .then(() => {
        createWindow()
        // const notification = new Notification({title: "Hello world", body: "First notification"});
        // notification.show()
    });

ipcMain.on('notify', (e, message) => {
    // new Notification({title: 'Notification', body: message}).show();
    new Notification({title: 'Version current', body: app.getVersion()}).show();
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
}); 

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0){
        createWindow();
    }
});


ipcMain.on('app_version', (event) => {
    event.sender.send('app_version', { version: app.getVersion() });
});

ipcMain.on('restart_app', () => {
    console.log('restarting');
    autoUpdater.quitAndInstall();
});


autoUpdater.on('update-available', () => {
    mainWindow.webContents.send('update_available');
    console.log('new update available');
    new Notification({title: 'Update available', body: "Update available new version"}).show();
});

autoUpdater.on('update-downloaded', () => {
    mainWindow.webContents.send('update_downloaded');
    console.log('downloaded new version.');
    new Notification({title: 'Update downloaded', body: "Dwonloaded new version!"}).show();
});