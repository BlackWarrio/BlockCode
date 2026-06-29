const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

const isDev = process.env.NODE_ENV !== 'production'

// File or folder passed via "Open with BlockCode" context menu
function getArgvPath() {
  const args = process.argv.slice(isDev ? 2 : 1)
  return args.find(a => !a.startsWith('-') && fs.existsSync(a)) || null
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  })

  if (isDev) {
    const tryLoad = (retries = 10) => {
      win.loadURL('http://localhost:5173').catch(() => {
        if (retries > 0) setTimeout(() => tryLoad(retries - 1), 1000)
      })
    }
    tryLoad()
  } else {
    win.loadFile(path.join(__dirname, 'dist/index.html'))
  }

  const argvPath = getArgvPath()
  if (argvPath) {
    win.webContents.once('did-finish-load', () => {
      const stat = fs.statSync(argvPath)
      if (stat.isDirectory()) {
        win.webContents.send('open-folder', { folder: argvPath, files: walkDir(argvPath) })
      } else {
        const content = fs.readFileSync(argvPath, 'utf-8')
        const ext = path.extname(argvPath).slice(1)
        win.webContents.send('open-file', { path: argvPath, content, ext })
      }
    })
  }
}

app.whenReady().then(createWindow)
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })

// Open file dialog → return { path, content, ext }
ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [
      { name: 'Source Files', extensions: ['py','js','ts','java','c','cpp','cc','rb','go','rs','php'] },
      { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openFile'],
  })
  if (canceled || !filePaths.length) return null
  const filePath = filePaths[0]
  const content = fs.readFileSync(filePath, 'utf-8')
  const ext = path.extname(filePath).slice(1)
  return { path: filePath, content, ext }
})

// Open folder → return flat file list
ipcMain.handle('dialog:openFolder', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openDirectory'] })
  if (canceled || !filePaths.length) return null
  const folder = filePaths[0]
  const files = walkDir(folder)
  return { folder, files }
})

// Save file
ipcMain.handle('file:save', async (_e, { filePath, content }) => {
  fs.writeFileSync(filePath, content, 'utf-8')
  return true
})

// Save-as dialog
ipcMain.handle('file:saveAs', async (_e, { content, ext }) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [{ name: 'Source File', extensions: [ext || 'txt'] }],
  })
  if (canceled || !filePath) return null
  fs.writeFileSync(filePath, content, 'utf-8')
  return filePath
})

function walkDir(dir, base = dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(full, base, results)
    } else {
      results.push({ name: entry.name, path: full, ext: path.extname(entry.name).slice(1) })
    }
  }
  return results
}
