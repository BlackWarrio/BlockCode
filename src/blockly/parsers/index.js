/**
 * Parsers: source code text → Blockly XML
 *
 * Strategy: regex/line-based AST-lite parsing for common patterns.
 * Complex/unsupported constructs become a single "raw code" text block.
 */

// ── Shared helpers ───────────────────────────────────────────────────────────

function block(type, fields = {}, values = {}, statements = {}) {
  const fieldXml = Object.entries(fields).map(([k, v]) => `<field name="${k}">${esc(v)}</field>`).join('')
  const valueXml = Object.entries(values).map(([k, v]) => `<value name="${k}">${v}</value>`).join('')
  const stmtXml = Object.entries(statements).map(([k, v]) =>
    `<statement name="${k}">${v}</statement>`
  ).join('')
  return `<block type="${type}">${fieldXml}${valueXml}${stmtXml}</block>`
}

function textBlock(str) {
  return block('text', { TEXT: str })
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}

function wrapXml(blocks) {
  return `<xml xmlns="https://developers.google.com/blockly/xml">${blocks}</xml>`
}

// ── Python parser ────────────────────────────────────────────────────────────

function parsePython(code) {
  const lines = code.split('\n')
  let xml = ''
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed || trimmed === '') { i++; continue }

    // import
    const importMatch = trimmed.match(/^import\s+(\S+)/)
    if (importMatch) {
      xml += block('py_import', { MODULE: importMatch[1] })
      i++; continue
    }

    // from x import y → treat as import block
    const fromImport = trimmed.match(/^from\s+(\S+)\s+import\s+(.+)/)
    if (fromImport) {
      xml += block('py_import', { MODULE: `${fromImport[1]}.${fromImport[2]}` })
      i++; continue
    }

    // comment
    if (trimmed.startsWith('#')) {
      xml += block('py_comment', { TEXT: trimmed.slice(1).trim() })
      i++; continue
    }

    // print(...)
    const printMatch = trimmed.match(/^print\((.+)\)$/)
    if (printMatch) {
      xml += block('py_print', {}, { VALUE: textBlock(printMatch[1]) })
      i++; continue
    }

    // def name(params):
    const defMatch = trimmed.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/)
    if (defMatch) {
      const bodyLines = collectIndentedBlock(lines, i)
      const bodyXml = parsePython(bodyLines.join('\n'))
      const innerBlocks = bodyXml.replace(/<\/?xml[^>]*>/g, '')
      xml += block('py_function_def', { NAME: defMatch[1], PARAMS: defMatch[2] }, {}, { BODY: innerBlocks })
      i += bodyLines.length + 1; continue
    }

    // class Name:
    const classMatch = trimmed.match(/^class\s+(\w+)/)
    if (classMatch) {
      const bodyLines = collectIndentedBlock(lines, i)
      const bodyXml = parsePython(bodyLines.join('\n'))
      const innerBlocks = bodyXml.replace(/<\/?xml[^>]*>/g, '')
      xml += block('py_class_def', { NAME: classMatch[1] }, {}, { BODY: innerBlocks })
      i += bodyLines.length + 1; continue
    }

    // return expr
    const returnMatch = trimmed.match(/^return\s+(.*)/)
    if (returnMatch) {
      xml += block('py_return', {}, { VALUE: textBlock(returnMatch[1]) })
      i++; continue
    }

    // assignment x = ...
    const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)/)
    if (assignMatch) {
      // map to variables_set
      xml += `<block type="variables_set"><field name="VAR">${esc(assignMatch[1])}</field><value name="VALUE">${textBlock(assignMatch[2])}</value></block>`
      i++; continue
    }

    // if ...: (simple single-line condition)
    const ifMatch = trimmed.match(/^if\s+(.+)\s*:/)
    if (ifMatch) {
      const bodyLines = collectIndentedBlock(lines, i)
      const bodyXml = parsePython(bodyLines.join('\n'))
      const innerBlocks = bodyXml.replace(/<\/?xml[^>]*>/g, '')
      xml += `<block type="controls_if"><value name="IF0">${textBlock(ifMatch[1])}</value><statement name="DO0">${innerBlocks}</statement></block>`
      i += bodyLines.length + 1; continue
    }

    // for var in iter:
    const forMatch = trimmed.match(/^for\s+(\w+)\s+in\s+(.+)\s*:/)
    if (forMatch) {
      const bodyLines = collectIndentedBlock(lines, i)
      const bodyXml = parsePython(bodyLines.join('\n'))
      const innerBlocks = bodyXml.replace(/<\/?xml[^>]*>/g, '')
      xml += `<block type="controls_forEach"><field name="VAR">${esc(forMatch[1])}</field><value name="LIST">${textBlock(forMatch[2])}</value><statement name="DO">${innerBlocks}</statement></block>`
      i += bodyLines.length + 1; continue
    }

    // fallback — raw text block
    xml += block('text', { TEXT: trimmed })
    i++
  }

  return wrapXml(xml)
}

function collectIndentedBlock(lines, headerIdx) {
  const base = lines[headerIdx].search(/\S/)
  const result = []
  for (let j = headerIdx + 1; j < lines.length; j++) {
    const t = lines[j].trim()
    if (!t) continue
    const indent = lines[j].search(/\S/)
    if (indent <= base) break
    result.push(lines[j])
  }
  return result
}

// ── JavaScript / TypeScript parser ──────────────────────────────────────────

function parseJS(code) {
  const lines = code.split('\n')
  let xml = ''

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    if (!trimmed) continue

    // comment
    if (trimmed.startsWith('//')) {
      xml += block('js_comment', { TEXT: trimmed.slice(2).trim() })
      continue
    }

    // console.log(...)
    const logMatch = trimmed.match(/^console\.log\((.+)\);?$/)
    if (logMatch) {
      xml += block('js_console_log', {}, { VALUE: textBlock(logMatch[1]) })
      continue
    }

    // const/let/var x = ...
    const varMatch = trimmed.match(/^(const|let|var)\s+(\w+)\s*=\s*(.+);?$/)
    if (varMatch) {
      const val = varMatch[3].replace(/;$/, '')
      xml += block('js_var_declare', { KIND: varMatch[1], NAME: varMatch[2] }, { VALUE: textBlock(val) })
      continue
    }

    // function name(...) or const name = (...) =>
    const fnMatch = trimmed.match(/^(?:const|let)?\s*(\w+)\s*=\s*\(([^)]*)\)\s*=>/)
    if (fnMatch) {
      xml += block('js_arrow_function', { NAME: fnMatch[1], PARAMS: fnMatch[2] })
      continue
    }

    // return
    const retMatch = trimmed.match(/^return\s+(.*);?$/)
    if (retMatch) {
      xml += block('js_return', {}, { VALUE: textBlock(retMatch[1]) })
      continue
    }

    // import / require → comment block
    if (trimmed.startsWith('import ') || trimmed.match(/require\(/)) {
      xml += block('js_comment', { TEXT: trimmed })
      continue
    }

    // fallback
    xml += textBlock(trimmed)
  }

  return wrapXml(xml)
}

// ── Java parser ──────────────────────────────────────────────────────────────

function parseJava(code) {
  const lines = code.split('\n')
  let xml = ''

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (!trimmed || trimmed === '{' || trimmed === '}') continue

    // comment
    if (trimmed.startsWith('//')) {
      xml += block('java_comment', { TEXT: trimmed.slice(2).trim() })
      continue
    }

    // System.out.println(...)
    const sysout = trimmed.match(/^System\.out\.println\((.+)\);?$/)
    if (sysout) {
      xml += block('java_sysout', {}, { VALUE: textBlock(sysout[1]) })
      continue
    }

    // class declaration
    const classMatch = trimmed.match(/^(public|private|protected)?\s*class\s+(\w+)/)
    if (classMatch) {
      xml += block('java_class_def', { ACCESS: classMatch[1] || 'public', NAME: classMatch[2] })
      continue
    }

    // method declaration
    const methodMatch = trimmed.match(/^(public|private|protected)\s+(void|int|String|boolean|double|\w+)\s+(\w+)\s*\(([^)]*)\)/)
    if (methodMatch) {
      xml += block('java_method_def', {
        ACCESS: methodMatch[1], RETURN: methodMatch[2],
        NAME: methodMatch[3], PARAMS: methodMatch[4],
      })
      continue
    }

    // type var = value;
    const varMatch = trimmed.match(/^(int|String|double|boolean|var)\s+(\w+)\s*=\s*(.+);?$/)
    if (varMatch) {
      xml += block('java_var_declare', { TYPE: varMatch[1], NAME: varMatch[2] }, { VALUE: textBlock(varMatch[3]) })
      continue
    }

    // return
    const retMatch = trimmed.match(/^return\s+(.*);?$/)
    if (retMatch) {
      xml += block('java_return', {}, { VALUE: textBlock(retMatch[1]) })
      continue
    }

    // fallback
    xml += textBlock(trimmed)
  }

  return wrapXml(xml)
}

// ── C / C++ parser ───────────────────────────────────────────────────────────

function parseC(code) {
  const lines = code.split('\n')
  let xml = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t || t === '{' || t === '}') continue
    if (t.startsWith('//')) { xml += block('c_comment', { TEXT: t.slice(2).trim() }); continue }
    const inc = t.match(/^#include\s*[<"](.+)[>"]/)
    if (inc) { xml += block('c_include', { HDR: inc[1] }); continue }
    const printf = t.match(/^printf\((.+)\);?$/)
    if (printf) { xml += block('c_printf', { FMT: printf[1] }); continue }
    const vdecl = t.match(/^(int|float|double|char|long)\s+(\w+)\s*=\s*(.+);?$/)
    if (vdecl) { xml += block('c_var_declare', { TYPE: vdecl[1], NAME: vdecl[2], VAL: vdecl[3] }); continue }
    xml += textBlock(t)
  }
  return wrapXml(xml)
}

// ── Ruby parser ───────────────────────────────────────────────────────────────

function parseRuby(code) {
  const lines = code.split('\n')
  let xml = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t || t === 'end') continue
    if (t.startsWith('#')) { xml += block('rb_comment', { TEXT: t.slice(1).trim() }); continue }
    const req = t.match(/^require\s+(.+)/)
    if (req) { xml += block('rb_require', { MOD: req[1] }); continue }
    const puts = t.match(/^puts\s+(.+)/)
    if (puts) { xml += block('rb_puts', {}, { VALUE: textBlock(puts[1]) }); continue }
    const defMatch = t.match(/^def\s+(\w+)\s*(\(([^)]*)\))?/)
    if (defMatch) { xml += block('rb_def', { NAME: defMatch[1], PARAMS: defMatch[3]||'' }); continue }
    const cls = t.match(/^class\s+(\w+)/)
    if (cls) { xml += block('rb_class', { NAME: cls[1], PARENT: '' }); continue }
    xml += textBlock(t)
  }
  return wrapXml(xml)
}

// ── Go parser ─────────────────────────────────────────────────────────────────

function parseGo(code) {
  const lines = code.split('\n')
  let xml = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t || t === '{' || t === '}') continue
    if (t.startsWith('//')) { xml += block('go_comment', { TEXT: t.slice(2).trim() }); continue }
    const imp = t.match(/^import\s+(.+)/)
    if (imp) { xml += block('go_import', { PKG: imp[1] }); continue }
    const println = t.match(/^fmt\.Println\((.+)\)/)
    if (println) { xml += block('go_fmt_println', {}, { VALUE: textBlock(println[1]) }); continue }
    const v = t.match(/^(\w+)\s*:=\s*(.+)/)
    if (v) { xml += block('go_var', { KIND: ':=', NAME: v[1], VAL: v[2] }); continue }
    const fn = t.match(/^func\s+(\w+)\(([^)]*)\)/)
    if (fn) { xml += block('go_func', { NAME: fn[1], PARAMS: fn[2], RET: '' }); continue }
    xml += textBlock(t)
  }
  return wrapXml(xml)
}

// ── Rust parser ───────────────────────────────────────────────────────────────

function parseRust(code) {
  const lines = code.split('\n')
  let xml = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t || t === '{' || t === '}') continue
    if (t.startsWith('//')) { xml += block('rs_comment', { TEXT: t.slice(2).trim() }); continue }
    const use_ = t.match(/^use\s+(.+);$/)
    if (use_) { xml += block('rs_use', { PATH: use_[1] }); continue }
    const let_ = t.match(/^(let(?:\s+mut)?)\s+(\w+)\s*=\s*(.+);?$/)
    if (let_) { xml += block('rs_let', { KIND: let_[1], NAME: let_[2], VAL: let_[3] }); continue }
    const fn_ = t.match(/^(?:pub\s+)?fn\s+(\w+)\(([^)]*)\)/)
    if (fn_) { xml += block('rs_fn', { VIS: 'fn', NAME: fn_[1], PARAMS: fn_[2], RET: '' }); continue }
    xml += textBlock(t)
  }
  return wrapXml(xml)
}

// ── PHP parser ────────────────────────────────────────────────────────────────

function parsePHP(code) {
  const lines = code.split('\n')
  let xml = ''
  for (const line of lines) {
    const t = line.trim()
    if (!t || t === '{' || t === '}' || t === '<?php' || t === '?>') continue
    if (t.startsWith('//')) { xml += block('php_comment', { TEXT: t.slice(2).trim() }); continue }
    const echo = t.match(/^echo\s+(.+);?$/)
    if (echo) { xml += block('php_echo', {}, { VALUE: textBlock(echo[1]) }); continue }
    const v = t.match(/^\$(\w+)\s*=\s*(.+);?$/)
    if (v) { xml += block('php_var', { NAME: v[1], VAL: v[2] }); continue }
    const fn = t.match(/^function\s+(\w+)\(([^)]*)\)/)
    if (fn) { xml += block('php_function', { NAME: fn[1], PARAMS: fn[2] }); continue }
    const cls = t.match(/^class\s+(\w+)/)
    if (cls) { xml += block('php_class', { NAME: cls[1], PARENT: '' }); continue }
    xml += textBlock(t)
  }
  return wrapXml(xml)
}

// ── Public API ───────────────────────────────────────────────────────────────

const PARSERS = {
  py:   parsePython,
  js:   parseJS,
  ts:   parseJS,
  java: parseJava,
  c:    parseC,
  cpp:  parseC,
  cc:   parseC,
  rb:   parseRuby,
  go:   parseGo,
  rs:   parseRust,
  php:  parsePHP,
}

/**
 * Parse source code into Blockly XML based on file extension.
 * Returns XML string or null if extension unsupported.
 */
export function parseToBlocks(code, ext) {
  const parser = PARSERS[ext]
  if (!parser || !code?.trim()) return null
  try {
    return parser(code)
  } catch (e) {
    console.error(`Parser error for .${ext}:`, e)
    return null
  }
}
