const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  openFolder: () => ipcRenderer.invoke('dialog:openFolder'),
  saveFile: (args) => ipcRenderer.invoke('file:save', args),
  saveFileAs: (args) => ipcRenderer.invoke('file:saveAs', args),
  onOpenFile: (cb) => ipcRenderer.on('open-file', (_e, data) => cb(data)),
  onOpenFolder: (cb) => ipcRenderer.on('open-folder', (_e, data) => cb(data)),
})
