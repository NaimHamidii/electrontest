const { ipcRenderer, contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    notificationAPI: {
        sendNotification(msg){
            ipcRenderer.send('notify', msg);
        }
    },
    newwindow: {
        openAoCProject(){
            ipcRenderer.send('openAoCProject');
        }
    } ,
    restartAfterUpdate: {
        restartApp(){
            ipcRenderer.send('restart_app');
        }
    }  
})