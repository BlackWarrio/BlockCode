# BlockCode — Build Instructions

## Before building

You need an app icon. Place the following files in the `assets/` folder:

- `assets/icon.ico` — Windows icon (256x256 recommended)
- `assets/icon.icns` — macOS icon (optional)
- `assets/icon.png` — Linux icon (512x512 recommended)

You can generate a free `.ico` from any image at https://www.icoconverter.com

## Build the installer

```bash
npm install
npm run build
```

The installer will be output to `dist/BlockCode Setup 1.0.0.exe`

## What the installer does

- Installs BlockCode to Program Files
- Adds a Desktop shortcut
- Adds a Start Menu entry
- Registers "Open with BlockCode" for: .py .js .ts .java .cpp .c .rb .go .rs .php
- Adds an uninstaller

## Development

```bash
npm start
```
