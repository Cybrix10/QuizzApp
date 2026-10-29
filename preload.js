const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    getAllFragen: () => ipcRenderer.invoke('fragen:getAll'),
    getAllKategorien: () => ipcRenderer.invoke('kategorien:getAll'),
    getAllStufen: () => ipcRenderer.invoke('stufen:getAll')
});