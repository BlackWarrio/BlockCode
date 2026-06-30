# BlockCode 🧩

> Write real code by dragging and dropping blocks — no typing required.

BlockCode is a visual programming editor built with [Blockly](https://developers.google.com/blockly), [React](https://react.dev/), and [Electron](https://www.electronjs.org/). It runs as a native desktop app on Windows and lets you build programs in **10 languages** just by snapping blocks together, while seeing the real generated code update live.

![BlockCode Screenshot](assets/icon256.png)

---

## ✨ What can it do?

- Drag and drop blocks to write Python, JavaScript, TypeScript, Java, C, C++, Ruby, Go, Rust, and PHP
- See the real generated code update live as you build
- Open any source file or entire project folder from your computer
- Save back to the original file or use Save As
- Import libraries like `pygame`, `numpy`, `requests`, `tkinter`, and more — and get extra blocks for them automatically
- Runs as a standalone desktop app, no browser or terminal needed
- Right-click any supported file in Windows Explorer and choose **Open with BlockCode**

---

## 📥 Download

> **Windows only for now.**

1. Go to the [Releases](../../releases) page
2. Download the latest `BlockCode Setup x.x.x.exe`
3. Run the installer — it adds BlockCode to your Start Menu, Desktop, and right-click context menu

---

## 🌐 Supported Languages

| Language | File Extension |
|---|---|
| Python | `.py` |
| JavaScript | `.js` |
| TypeScript | `.ts` |
| Java | `.java` |
| C | `.c` |
| C++ | `.cpp` / `.cc` |
| Ruby | `.rb` |
| Go | `.go` |
| Rust | `.rs` |
| PHP | `.php` |

---

## 🛠️ Run from Source

Want to contribute or build it yourself? Here's how.

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or newer
- [Git](https://git-scm.com/)

### Install

```bash
git clone https://github.com/your-username/BlockCode.git
cd BlockCode
npm install --legacy-peer-deps
```

### Start in development mode (hot reload)

```bash
npm start
```

This starts Vite and Electron together. Changes to the source reload automatically.

### Run the built app without the dev server

```bash
npm run preview
```

This builds the app then opens it — no Vite server running in the background.

### Build the Windows installer

```bash
npm run build
```

Output: `dist/BlockCode Setup 1.0.0.exe`

The installer sets up:
- Start Menu and Desktop shortcuts
- "Open with BlockCode" right-click menu for all supported file types
- An uninstaller

---

## 📁 Project Structure

```
BlockCode/
├── main.js                  # Electron main process
├── preload.js               # Electron preload script
├── index.html               # HTML entry point
├── vite.config.js           # Vite config
├── src/
│   ├── App.jsx              # Root React component
│   ├── components/
│   │   ├── BlockEditor.jsx  # Blockly workspace + code preview
│   │   ├── FileTree.jsx     # Sidebar file explorer
│   │   └── Toolbar.jsx      # Top toolbar
│   └── blockly/
│       ├── toolboxes.js     # Toolbox XML per language
│       ├── blocks/          # Block definitions per language
│       └── generators/      # Code generators per language
└── assets/                  # App icons
```

---

## 🤝 Contributing

Contributions are welcome! Here's how to add new blocks:

1. Find the right file in `src/blockly/blocks/` — for example `pythonAll.js` for Python core blocks, or `pyLibBlocks.js` for Python library blocks
2. Define the block shape:
   ```js
   Blockly.Blocks['my_block'] = {
     init() {
       this.appendDummyInput().appendField('do something')
       this.setPreviousStatement(true)
       this.setNextStatement(true)
       this.setColour('#3572A5')
     }
   }
   ```
3. Add a code generator:
   ```js
   pythonGenerator.forBlock['my_block'] = () => `do_something()\n`
   ```
4. Add the block to the toolbox in `src/blockly/toolboxes.js`

To add blocks for a Python library (like a new `requests` block), add them to `src/blockly/blocks/pyLibBlocks.js` and register the block names in the `PY_LIB_BLOCKS` export at the bottom of that file. BlockCode will automatically show them when the user places an `import` block with that library name.

---

## 📄 License

MIT — free to use, modify, and distribute.
