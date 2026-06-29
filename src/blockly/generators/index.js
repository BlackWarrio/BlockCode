import { pythonGenerator } from '../blocks/pythonAll.js'
import { javascriptGenerator } from '../blocks/jsAll.js'
import { javaGenerator } from '../blocks/javaAll.js'
import { cGenerator, cppGenerator } from '../blocks/cAll.js'
import { rubyGenerator, goGenerator } from '../blocks/rubyGoAll.js'
import { rustGenerator, phpGenerator } from '../blocks/rustPhpAll.js'

const GENERATORS = {
  py:   pythonGenerator,
  js:   javascriptGenerator,
  ts:   javascriptGenerator,
  java: javaGenerator,
  c:    cGenerator,
  cpp:  cppGenerator,
  cc:   cppGenerator,
  rb:   rubyGenerator,
  go:   goGenerator,
  rs:   rustGenerator,
  php:  phpGenerator,
}

export function getGenerator(ext) { return GENERATORS[ext] || null }
