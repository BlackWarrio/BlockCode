import React, { useState, useCallback, useEffect } from 'react'
import FileTree from './components/FileTree'
import BlockEditor from './components/BlockEditor'
import Toolbar from './components/Toolbar'
import About from './components/About'
import { parseToBlocks } from './blockly/parsers/index.js'
import './App.css'

export default function App() {
  const [openFiles, setOpenFiles] = useState([])
  const [activeIdx, setActiveIdx] = useState(null)
  const [folder, setFolder] = useState(null)
  const [showAbout, setShowAbout] = useState(false)

  const openFileResult = useCallback((result) => {
    if (!result) return
    const xml = parseToBlocks(result.content, result.ext)
    const file = { ...result, xml }
    setOpenFiles(prev => {
      const exists = prev.findIndex(f => f.path === file.path)
      if (exists !== -1) { setActiveIdx(exists); return prev }
      const next = [...prev, file]
      setActiveIdx(next.length - 1)
      return next
    })
  }, [])

  // Handle "Open with BlockCode" — file or folder passed via command line
  useEffect(() => {
    window.api.onOpenFile(openFileResult)
    window.api.onOpenFolder((result) => setFolder(result))
  }, [])

  const handleOpenFile = useCallback(async () => {
    const result = await window.api.openFile()
    openFileResult(result)
  }, [openFileResult])

  const handleOpenFolder = useCallback(async () => {
    const result = await window.api.openFolder()
    if (result) setFolder(result)
  }, [])

  const handleOpenFromTree = useCallback(async (fileMeta) => {
    const exists = openFiles.findIndex(f => f.path === fileMeta.path)
    if (exists !== -1) { setActiveIdx(exists); return }
    const content = await window.api.openFile().catch(() => null)
    if (!content) return
    openFileResult(content)
  }, [openFiles, openFileResult])

  const handleSave = useCallback(async (xml, code) => {
    if (activeIdx === null) return
    const file = openFiles[activeIdx]
    await window.api.saveFile({ filePath: file.path, content: code })
  }, [activeIdx, openFiles])

  const handleSaveAs = useCallback(async (xml, code) => {
    if (activeIdx === null) return
    const file = openFiles[activeIdx]
    const newPath = await window.api.saveFileAs({ content: code, ext: file.ext })
    if (newPath) {
      setOpenFiles(prev => prev.map((f, i) => i === activeIdx ? { ...f, path: newPath } : f))
    }
  }, [activeIdx, openFiles])

  const activeFile = activeIdx !== null ? openFiles[activeIdx] : null

  return (
    <div className="app">
      {showAbout && <About onClose={() => setShowAbout(false)} />}
      <Toolbar onOpen={handleOpenFile} onOpenFolder={handleOpenFolder} onSave={handleSave} onSaveAs={handleSaveAs} onAbout={() => setShowAbout(true)} />
      <div className="workspace">
        <FileTree folder={folder} onFileClick={handleOpenFromTree} />
        <div className="editor-area">
          <div className="tabs">
            {openFiles.map((f, i) => (
              <button
                key={f.path}
                className={`tab ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                {f.path.split(/[\\/]/).pop()}
                <span className="tab-close" onClick={e => {
                  e.stopPropagation()
                  setOpenFiles(p => p.filter((_, j) => j !== i))
                  setActiveIdx(i > 0 ? i - 1 : null)
                }}>×</span>
              </button>
            ))}
          </div>
          {activeFile ? (
            <BlockEditor key={activeFile.path} file={activeFile} onSave={handleSave} onSaveAs={handleSaveAs} />
          ) : (
            <div className="empty-state">Open a file to start editing blocks</div>
          )}
        </div>
      </div>
    </div>
  )
}
