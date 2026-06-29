import React from 'react'
import './Toolbar.css'

export default function Toolbar({ onOpen, onOpenFolder, onSave, onSaveAs, onAbout }) {
  return (
    <div className="toolbar">
      <span className="toolbar-brand">⬡ BlockCode</span>
      <button onClick={onOpenFolder}>📁 Folder</button>
      <button onClick={onOpen}>📄 Open</button>
      <button onClick={onSave}>💾 Save</button>
      <button onClick={onSaveAs}>💾 Save As</button>
      <div style={{flex:1}} />
      <button onClick={onAbout} style={{marginLeft:'auto'}}>ℹ️ About</button>
    </div>
  )
}
