import React from 'react'
import './About.css'

export default function About({ onClose }) {
  return (
    <div className="about-overlay" onClick={onClose}>
      <div className="about-box" onClick={e => e.stopPropagation()}>
        <div className="about-logo">⬡</div>
        <h1>BlockCode</h1>
        <p className="about-version">Version 1.0.0</p>
        <p className="about-desc">
          A visual block-based IDE. Open any source file and it automatically
          converts your code into draggable blocks. Edit visually, save back as
          real code.
        </p>
        <div className="about-langs">
          <span>🐍 Python</span><span>🟨 JavaScript</span><span>🔷 TypeScript</span>
          <span>☕ Java</span><span>⚙️ C / C++</span><span>💎 Ruby</span>
          <span>🐹 Go</span><span>🦀 Rust</span><span>🐘 PHP</span>
        </div>
        <p className="about-feature">
          ✦ Open files with blocks via right-click → <em>Open with BlockCode</em>
        </p>
        <button className="about-close" onClick={onClose}>Close</button>
      </div>
    </div>
  )
}
