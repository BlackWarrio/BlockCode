import * as Blockly from 'blockly'
import { javascriptGenerator } from 'blockly/javascript'

const JS = '#f7df1e'
const G = '#6a6a6a'

// ── JS/TS BLOCKS ─────────────────────────────────────────────────────────────

Blockly.Blocks['js_console_log']    = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('console.log'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_console_error']  = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('console.error'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_var_declare']    = { init() { this.appendValueInput('VALUE').setCheck(null).appendField(new Blockly.FieldDropdown([['const','const'],['let','let'],['var','var']]),'KIND').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField('='); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_arrow_function'] = { init() { this.appendDummyInput().appendField('const').appendField(new Blockly.FieldTextInput('fn'),'NAME').appendField('= (').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(') =>'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_function']       = { init() { this.appendDummyInput().appendField('function').appendField(new Blockly.FieldTextInput('myFn'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_return']         = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('return'); this.setPreviousStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_array_create']   = { init() { this.appendDummyInput().appendField('array []'); this.setOutput(true,'Array'); this.setColour(JS) } }
Blockly.Blocks['js_object_create']  = { init() { this.appendDummyInput().appendField('object {}'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_comment']        = { init() { this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(G) } }
Blockly.Blocks['js_try_catch']      = { init() { this.appendStatementInput('TRY').setCheck(null).appendField('try'); this.appendDummyInput().appendField('catch(').appendField(new Blockly.FieldTextInput('e'),'VAR').appendField(')'); this.appendStatementInput('CATCH').setCheck(null); this.appendStatementInput('FINALLY').setCheck(null).appendField('finally'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#e06c75') } }
Blockly.Blocks['js_throw']          = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('throw new Error('); this.appendDummyInput().appendField(')'); this.setPreviousStatement(true); this.setColour('#e06c75') } }
Blockly.Blocks['js_settimeout']     = { init() { this.appendDummyInput().appendField('setTimeout(').appendField(new Blockly.FieldTextInput('fn'),'FN').appendField(',').appendField(new Blockly.FieldNumber(1000),'MS').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_setinterval']    = { init() { this.appendDummyInput().appendField('setInterval(').appendField(new Blockly.FieldTextInput('fn'),'FN').appendField(',').appendField(new Blockly.FieldNumber(1000),'MS').appendField(')'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_promise']        = { init() { this.appendDummyInput().appendField('new Promise((resolve, reject) =>'); this.appendStatementInput('BODY').setCheck(null); this.appendDummyInput().appendField(')'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_await']          = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('await'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_async_fn']       = { init() { this.appendDummyInput().appendField('async function').appendField(new Blockly.FieldTextInput('myFn'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_import']         = { init() { this.appendDummyInput().appendField('import').appendField(new Blockly.FieldTextInput('{ x }'),'ITEMS').appendField('from').appendField(new Blockly.FieldTextInput("'module'"),'SRC'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_export']         = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['export default','export default'],['export','export']]),'KIND').appendField(new Blockly.FieldTextInput('MyThing'),'NAME'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_array_map']      = { init() { this.appendDummyInput().appendField(new Blockly.FieldTextInput('arr'),'ARR').appendField('.map(').appendField(new Blockly.FieldTextInput('x => x'),'FN').appendField(')'); this.setOutput(true,'Array'); this.setColour(JS) } }
Blockly.Blocks['js_array_filter']   = { init() { this.appendDummyInput().appendField(new Blockly.FieldTextInput('arr'),'ARR').appendField('.filter(').appendField(new Blockly.FieldTextInput('x => x'),'FN').appendField(')'); this.setOutput(true,'Array'); this.setColour(JS) } }
Blockly.Blocks['js_array_push']     = { init() { this.appendDummyInput().appendField(new Blockly.FieldTextInput('arr'),'ARR').appendField('.push(').appendField(new Blockly.FieldTextInput('item'),'ITEM').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_json_parse']     = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('JSON.parse('); this.appendDummyInput().appendField(')'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_json_stringify'] = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('JSON.stringify('); this.appendDummyInput().appendField(')'); this.setOutput(true,'String'); this.setColour(JS) } }
Blockly.Blocks['js_random']         = { init() { this.appendDummyInput().appendField('Math.random()'); this.setOutput(true,'Number'); this.setColour(JS) } }
Blockly.Blocks['js_random_int']     = { init() { this.appendDummyInput().appendField('randomInt(').appendField(new Blockly.FieldNumber(0),'MIN').appendField(',').appendField(new Blockly.FieldNumber(100),'MAX').appendField(')'); this.setOutput(true,'Number'); this.setColour(JS) } }
Blockly.Blocks['js_typeof']         = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('typeof'); this.setOutput(true,'String'); this.setColour(JS) } }
Blockly.Blocks['js_ternary']        = { init() { this.appendValueInput('COND').setCheck(null).appendField('if'); this.appendValueInput('THEN').setCheck(null).appendField('?'); this.appendValueInput('ELSE').setCheck(null).appendField(':'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_spread']         = { init() { this.appendDummyInput().appendField('...').appendField(new Blockly.FieldTextInput('arr'),'NAME'); this.setOutput(true,null); this.setColour(JS) } }
Blockly.Blocks['js_class']          = { init() { this.appendDummyInput().appendField('class').appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField('extends').appendField(new Blockly.FieldTextInput(''),'PARENT'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JS) } }
Blockly.Blocks['js_new']            = { init() { this.appendDummyInput().appendField('new').appendField(new Blockly.FieldTextInput('MyClass'),'CLASS').appendField('(').appendField(new Blockly.FieldTextInput(''),'ARGS').appendField(')'); this.setOutput(true,null); this.setColour(JS) } }

// TypeScript extras
Blockly.Blocks['ts_interface']   = { init() { this.appendDummyInput().appendField('interface').appendField(new Blockly.FieldTextInput('IFoo'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#3178c6') } }
Blockly.Blocks['ts_type_alias']  = { init() { this.appendDummyInput().appendField('type').appendField(new Blockly.FieldTextInput('MyType'),'NAME').appendField('=').appendField(new Blockly.FieldTextInput('string | number'),'DEF'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#3178c6') } }
Blockly.Blocks['ts_enum']        = { init() { this.appendDummyInput().appendField('enum').appendField(new Blockly.FieldTextInput('Direction'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#3178c6') } }
Blockly.Blocks['ts_typed_var']   = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['const','const'],['let','let']]),'KIND').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField(':').appendField(new Blockly.FieldTextInput('string'),'TYPE').appendField('=').appendField(new Blockly.FieldTextInput("'value'"),'VAL'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#3178c6') } }
Blockly.Blocks['ts_as']          = { init() { this.appendValueInput('VALUE').setCheck(null); this.appendDummyInput().appendField('as').appendField(new Blockly.FieldTextInput('string'),'TYPE'); this.setOutput(true,null); this.setColour('#3178c6') } }

// JS generators
const g = javascriptGenerator
g.forBlock['js_console_log']    = (b,g) => `console.log(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||"''"})\n`
g.forBlock['js_console_error']  = (b,g) => `console.error(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||"''"})\n`
g.forBlock['js_var_declare']    = (b,g) => `${b.getFieldValue('KIND')} ${b.getFieldValue('NAME')} = ${g.valueToCode(b,'VALUE',g.ORDER_ASSIGNMENT)||'undefined'};\n`
g.forBlock['js_arrow_function'] = (b,g) => `const ${b.getFieldValue('NAME')} = (${b.getFieldValue('PARAMS')}) => {\n${g.statementToCode(b,'BODY')}};\n`
g.forBlock['js_function']       = (b,g) => `function ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) {\n${g.statementToCode(b,'BODY')}}\n`
g.forBlock['js_return']         = (b,g) => `return ${g.valueToCode(b,'VALUE',g.ORDER_NONE)};\n`
g.forBlock['js_array_create']   = (_,g) => ['[]', g.ORDER_ATOMIC]
g.forBlock['js_object_create']  = (_,g) => ['{}', g.ORDER_ATOMIC]
g.forBlock['js_comment']        = b => `// ${b.getFieldValue('TEXT')}\n`
g.forBlock['js_try_catch']      = (b,g) => `try {\n${g.statementToCode(b,'TRY')}} catch(${b.getFieldValue('VAR')}) {\n${g.statementToCode(b,'CATCH')}} finally {\n${g.statementToCode(b,'FINALLY')}}\n`
g.forBlock['js_throw']          = (b,g) => `throw new Error(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||"''"});\n`
g.forBlock['js_settimeout']     = b => `setTimeout(${b.getFieldValue('FN')}, ${b.getFieldValue('MS')});\n`
g.forBlock['js_setinterval']    = b => [`setInterval(${b.getFieldValue('FN')}, ${b.getFieldValue('MS')})`, 0]
g.forBlock['js_promise']        = (b,g) => [`new Promise((resolve, reject) => {\n${g.statementToCode(b,'BODY')}})`, 0]
g.forBlock['js_await']          = (b,g) => [`await ${g.valueToCode(b,'VALUE',g.ORDER_NONE)}`, 0]
g.forBlock['js_async_fn']       = (b,g) => `async function ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) {\n${g.statementToCode(b,'BODY')}}\n`
g.forBlock['js_import']         = b => `import ${b.getFieldValue('ITEMS')} from ${b.getFieldValue('SRC')};\n`
g.forBlock['js_export']         = b => `${b.getFieldValue('KIND')} ${b.getFieldValue('NAME')};\n`
g.forBlock['js_array_map']      = b => [`${b.getFieldValue('ARR')}.map(${b.getFieldValue('FN')})`, 0]
g.forBlock['js_array_filter']   = b => [`${b.getFieldValue('ARR')}.filter(${b.getFieldValue('FN')})`, 0]
g.forBlock['js_array_push']     = b => `${b.getFieldValue('ARR')}.push(${b.getFieldValue('ITEM')});\n`
g.forBlock['js_json_parse']     = (b,g) => [`JSON.parse(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||"''"})`, 0]
g.forBlock['js_json_stringify'] = (b,g) => [`JSON.stringify(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||'null'})`, 0]
g.forBlock['js_random']         = (_,g) => ['Math.random()', g.ORDER_FUNCTION_CALL]
g.forBlock['js_random_int']     = b => [`Math.floor(Math.random()*(${b.getFieldValue('MAX')}-${b.getFieldValue('MIN')}+1))+${b.getFieldValue('MIN')}`, 0]
g.forBlock['js_typeof']         = (b,g) => [`typeof ${g.valueToCode(b,'VALUE',g.ORDER_NONE)}`, 0]
g.forBlock['js_ternary']        = (b,g) => [`(${g.valueToCode(b,'COND',g.ORDER_NONE)}) ? (${g.valueToCode(b,'THEN',g.ORDER_NONE)}) : (${g.valueToCode(b,'ELSE',g.ORDER_NONE)})`, 0]
g.forBlock['js_spread']         = b => [`...${b.getFieldValue('NAME')}`, 0]
g.forBlock['js_class']          = (b,g) => { const p=b.getFieldValue('PARENT'); return `class ${b.getFieldValue('NAME')}${p?` extends ${p}`:''} {\n${g.statementToCode(b,'BODY')}}\n` }
g.forBlock['js_new']            = b => [`new ${b.getFieldValue('CLASS')}(${b.getFieldValue('ARGS')})`, 0]
g.forBlock['ts_interface']      = (b,g) => `interface ${b.getFieldValue('NAME')} {\n${g.statementToCode(b,'BODY')}}\n`
g.forBlock['ts_type_alias']     = b => `type ${b.getFieldValue('NAME')} = ${b.getFieldValue('DEF')};\n`
g.forBlock['ts_enum']           = (b,g) => `enum ${b.getFieldValue('NAME')} {\n${g.statementToCode(b,'BODY')}}\n`
g.forBlock['ts_typed_var']      = b => `${b.getFieldValue('KIND')} ${b.getFieldValue('NAME')}: ${b.getFieldValue('TYPE')} = ${b.getFieldValue('VAL')};\n`
g.forBlock['ts_as']             = (b,g) => [`(${g.valueToCode(b,'VALUE',g.ORDER_NONE)} as ${b.getFieldValue('TYPE')})`, 0]

export { javascriptGenerator }
