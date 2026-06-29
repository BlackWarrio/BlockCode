import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as Blockly from 'blockly'
import { getToolboxForExt } from '../blockly/toolboxes'
import { getGenerator } from '../blockly/generators/index.js'
import './BlockEditor.css'

export default function BlockEditor({ file, onSave, onSaveAs }) {
  const blocklyDiv = useRef(null)
  const workspace = useRef(null)
  const [code, setCode] = useState('')
  const [showCode, setShowCode] = useState(false)

  // Initialize Blockly once per file
  useEffect(() => {
    if (!blocklyDiv.current) return

    const toolbox = getToolboxForExt(file.ext)

    workspace.current = Blockly.inject(blocklyDiv.current, {
      toolbox,
      theme: Blockly.Theme.defineTheme('dark', {
        base: Blockly.Themes.Classic,
        componentStyles: {
          workspaceBackgroundColour: '#1e1e2e',
          toolboxBackgroundColour: '#181825',
          toolboxForegroundColour: '#cdd6f4',
          flyoutBackgroundColour: '#24273a',
          scrollbarColour: '#45475a',
        },
      }),
      grid: { spacing: 20, length: 3, colour: '#313244', snap: true },
      move: { scrollbars: true, drag: true, wheel: true },
      zoom: { controls: true, startScale: 0.9 },
      trashcan: true,
    })

    // Load initial XML from file parse
    if (file.xml) {
      try {
        const dom = Blockly.utils.xml.textToDom(file.xml)
        Blockly.Xml.domToWorkspace(dom, workspace.current)
      } catch (e) {
        console.warn('Could not load XML:', e)
      }
    }

    const onChange = () => {
      const gen = getGenerator(file.ext)
      if (gen) {
        try { setCode(gen.workspaceToCode(workspace.current)) } catch {}
      }
    }
    workspace.current.addChangeListener(onChange)
    onChange()

    return () => {
      workspace.current?.dispose()
    }
  }, [file.path])

  const handleSave = useCallback(() => {
    const xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace.current))
    onSave(xml, code)
  }, [code, onSave])

  // Ctrl+S
  useEffect(() => {
    const handler = (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); handleSave() } }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleSave])

  return (
    <div className="block-editor">
      <div className="be-actions">
        <span className="be-lang">{file.ext.toUpperCase()}</span>
        <button onClick={() => setShowCode(v => !v)}>{showCode ? 'Hide Code' : 'View Code'}</button>
        <button onClick={handleSave}>Save</button>
      </div>
      <div className="be-body">
        <div ref={blocklyDiv} className="blockly-div" />
        {showCode && (
          <pre className="code-preview">{code || '// No code generated yet'}</pre>
        )}
      </div>
    </div>
  )
}
