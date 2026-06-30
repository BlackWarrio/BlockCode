import React, { useState } from 'react'
import './FileTree.css'

const ICONS = { py: '🐍', js: '🟨', java: '☕', ts: '🔷', cpp: '⚙️', c: '⚙️' }

export default function FileTree({ folder, onFileClick }) {
  const [collapsed, setCollapsed] = useState({})

  if (!folder) {
    return <div className="filetree empty">No folder open</div>
  }

  // Group files by relative parent dir
  const groups = {}
  for (const f of folder.files) {
    const rel = f.path.replace(folder.folder, '').replace(/^[\\/]/, '')
    const parts = rel.split(/[\\/]/)
    const dir = parts.length > 1 ? parts.slice(0, -1).join('/') : '.'
    if (!groups[dir]) groups[dir] = []
    groups[dir].push(f)
  }

  return (
    <div className="filetree">
      <div className="filetree-header">{folder.folder.split(/[\\/]/).pop()}</div>
      {Object.entries(groups).map(([dir, files]) => (
        <div key={dir}>
          {dir !== '.' && (
            <div className="dir-label" onClick={() => setCollapsed(c => ({ ...c, [dir]: !c[dir] }))}>
              {collapsed[dir] ? '▶' : '▼'} {dir}
            </div>
          )}
          {!collapsed[dir] && files.map(f => (
            <div key={f.path} className="file-item" onClick={() => onFileClick(f)}>
              {ICONS[f.ext] || '📄'} {f.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
