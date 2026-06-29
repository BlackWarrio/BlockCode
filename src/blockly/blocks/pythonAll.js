import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'
import { javascriptGenerator } from 'blockly/javascript'

// ── PYTHON BLOCKS ────────────────────────────────────────────────────────────

const PY = '#3572A5'

const pyBlocks = {
  py_print:         () => { const b = Blockly.Blocks['py_print'] = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('print'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_input:         () => { Blockly.Blocks['py_input'] = { init() { this.appendValueInput('PROMPT').setCheck('String').appendField('input'); this.setOutput(true,'String'); this.setColour(PY) } } },
  py_import:        () => { Blockly.Blocks['py_import'] = { init() { this.appendDummyInput().appendField('import').appendField(new Blockly.FieldTextInput('os'),'MODULE'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_from_import:   () => { Blockly.Blocks['py_from_import'] = { init() { this.appendDummyInput().appendField('from').appendField(new Blockly.FieldTextInput('os'),'MODULE').appendField('import').appendField(new Blockly.FieldTextInput('path'),'NAME'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_function_def:  () => { Blockly.Blocks['py_function_def'] = { init() { this.appendDummyInput().appendField('def').appendField(new Blockly.FieldTextInput('my_func'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_class_def:     () => { Blockly.Blocks['py_class_def'] = { init() { this.appendDummyInput().appendField('class').appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARENT').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_return:        () => { Blockly.Blocks['py_return'] = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('return'); this.setPreviousStatement(true); this.setColour(PY) } } },
  py_comment:       () => { Blockly.Blocks['py_comment'] = { init() { this.appendDummyInput().appendField('#').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#6a6a6a') } } },
  py_list_create:   () => { Blockly.Blocks['py_list_create'] = { init() { this.appendDummyInput().appendField('list []'); this.setOutput(true,'Array'); this.setColour(PY) } } },
  py_dict_create:   () => { Blockly.Blocks['py_dict_create'] = { init() { this.appendDummyInput().appendField('dict {}'); this.setOutput(true,null); this.setColour(PY) } } },
  py_list_append:   () => { Blockly.Blocks['py_list_append'] = { init() { this.appendValueInput('LIST').setCheck(null).appendField('list'); this.appendValueInput('ITEM').setCheck(null).appendField('.append('); this.appendDummyInput().appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_list_comp:     () => { Blockly.Blocks['py_list_comp'] = { init() { this.appendDummyInput().appendField('[').appendField(new Blockly.FieldTextInput('x'),'EXPR').appendField('for').appendField(new Blockly.FieldTextInput('x'),'VAR').appendField('in').appendField(new Blockly.FieldTextInput('items'),'ITER').appendField(']'); this.setOutput(true,'Array'); this.setColour(PY) } } },
  py_try_except:    () => { Blockly.Blocks['py_try_except'] = { init() { this.appendStatementInput('TRY').setCheck(null).appendField('try'); this.appendDummyInput().appendField('except').appendField(new Blockly.FieldTextInput('Exception'),'EXC').appendField('as').appendField(new Blockly.FieldTextInput('e'),'VAR'); this.appendStatementInput('EXCEPT').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#e06c75') } } },
  py_with:          () => { Blockly.Blocks['py_with'] = { init() { this.appendDummyInput().appendField('with').appendField(new Blockly.FieldTextInput('open("file")'),'EXPR').appendField('as').appendField(new Blockly.FieldTextInput('f'),'VAR'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_yield:         () => { Blockly.Blocks['py_yield'] = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('yield'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_raise:         () => { Blockly.Blocks['py_raise'] = { init() { this.appendDummyInput().appendField('raise').appendField(new Blockly.FieldTextInput('ValueError("msg")'),'EXC'); this.setPreviousStatement(true); this.setColour('#e06c75') } } },
  py_fstring:       () => { Blockly.Blocks['py_fstring'] = { init() { this.appendDummyInput().appendField('f"').appendField(new Blockly.FieldTextInput('{var} text'),'EXPR').appendField('"'); this.setOutput(true,'String'); this.setColour(PY) } } },
  py_sleep:         () => { Blockly.Blocks['py_sleep'] = { init() { this.appendValueInput('SECS').setCheck('Number').appendField('time.sleep('); this.appendDummyInput().appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PY) } } },
  py_random_int:    () => { Blockly.Blocks['py_random_int'] = { init() { this.appendDummyInput().appendField('random.randint(').appendField(new Blockly.FieldNumber(0),'MIN').appendField(',').appendField(new Blockly.FieldNumber(100),'MAX').appendField(')'); this.setOutput(true,'Number'); this.setColour(PY) } } },
  py_open_file:     () => { Blockly.Blocks['py_open_file'] = { init() { this.appendDummyInput().appendField('open(').appendField(new Blockly.FieldTextInput('file.txt'),'PATH').appendField(',').appendField(new Blockly.FieldDropdown([['r','r'],['w','w'],['a','a']]),'MODE').appendField(')'); this.setOutput(true,null); this.setColour(PY) } } },
  py_lambda:        () => { Blockly.Blocks['py_lambda'] = { init() { this.appendDummyInput().appendField('lambda').appendField(new Blockly.FieldTextInput('x'),'PARAMS').appendField(':').appendField(new Blockly.FieldTextInput('x*2'),'EXPR'); this.setOutput(true,null); this.setColour(PY) } } },
}

Object.values(pyBlocks).forEach(fn => fn())

// Python generators
pythonGenerator.forBlock['py_print']       = (b,g) => `print(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||"''"})\n`
pythonGenerator.forBlock['py_input']       = (b,g) => [`input(${g.valueToCode(b,'PROMPT',g.ORDER_NONE)||"''"})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['py_import']      = b => `import ${b.getFieldValue('MODULE')}\n`
pythonGenerator.forBlock['py_from_import'] = b => `from ${b.getFieldValue('MODULE')} import ${b.getFieldValue('NAME')}\n`
pythonGenerator.forBlock['py_function_def']= (b,g) => `def ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}):\n${g.statementToCode(b,'BODY')||'    pass\n'}`
pythonGenerator.forBlock['py_class_def']   = (b,g) => { const p=b.getFieldValue('PARENT'); return `class ${b.getFieldValue('NAME')}${p?`(${p})`:''}:\n${g.statementToCode(b,'BODY')||'    pass\n'}` }
pythonGenerator.forBlock['py_return']      = (b,g) => `return ${g.valueToCode(b,'VALUE',g.ORDER_NONE)}\n`
pythonGenerator.forBlock['py_comment']     = b => `# ${b.getFieldValue('TEXT')}\n`
pythonGenerator.forBlock['py_list_create'] = (_,g) => ['[]', g.ORDER_ATOMIC]
pythonGenerator.forBlock['py_dict_create'] = (_,g) => ['{}', g.ORDER_ATOMIC]
pythonGenerator.forBlock['py_list_append'] = (b,g) => `${g.valueToCode(b,'LIST',g.ORDER_NONE)||'lst'}.append(${g.valueToCode(b,'ITEM',g.ORDER_NONE)||'None'})\n`
pythonGenerator.forBlock['py_list_comp']   = (b,g) => [`[${b.getFieldValue('EXPR')} for ${b.getFieldValue('VAR')} in ${b.getFieldValue('ITER')}]`, g.ORDER_ATOMIC]
pythonGenerator.forBlock['py_try_except']  = (b,g) => `try:\n${g.statementToCode(b,'TRY')||'    pass\n'}except ${b.getFieldValue('EXC')} as ${b.getFieldValue('VAR')}:\n${g.statementToCode(b,'EXCEPT')||'    pass\n'}`
pythonGenerator.forBlock['py_with']        = (b,g) => `with ${b.getFieldValue('EXPR')} as ${b.getFieldValue('VAR')}:\n${g.statementToCode(b,'BODY')||'    pass\n'}`
pythonGenerator.forBlock['py_yield']       = (b,g) => `yield ${g.valueToCode(b,'VALUE',g.ORDER_NONE)}\n`
pythonGenerator.forBlock['py_raise']       = b => `raise ${b.getFieldValue('EXC')}\n`
pythonGenerator.forBlock['py_fstring']     = (b,g) => [`f"${b.getFieldValue('EXPR')}"`, g.ORDER_ATOMIC]
pythonGenerator.forBlock['py_sleep']       = (b,g) => `time.sleep(${g.valueToCode(b,'SECS',g.ORDER_NONE)||'1'})\n`
pythonGenerator.forBlock['py_random_int']  = b => [`random.randint(${b.getFieldValue('MIN')},${b.getFieldValue('MAX')})`, 0]
pythonGenerator.forBlock['py_open_file']   = b => [`open("${b.getFieldValue('PATH')}","${b.getFieldValue('MODE')}")`, 0]
pythonGenerator.forBlock['py_lambda']      = b => [`lambda ${b.getFieldValue('PARAMS')}: ${b.getFieldValue('EXPR')}`, 0]

export { pythonGenerator }
