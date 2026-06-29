import * as Blockly from 'blockly'

Blockly.Blocks['js_console_log'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null).appendField('console.log')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#f7df1e')
  }
}

Blockly.Blocks['js_var_declare'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null)
      .appendField(new Blockly.FieldDropdown([['const','const'],['let','let'],['var','var']]), 'KIND')
      .appendField(new Blockly.FieldTextInput('x'), 'NAME').appendField('=')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#f7df1e')
  }
}

Blockly.Blocks['js_arrow_function'] = {
  init() {
    this.appendDummyInput().appendField('const').appendField(new Blockly.FieldTextInput('fn'), 'NAME')
      .appendField('= (').appendField(new Blockly.FieldTextInput(''), 'PARAMS').appendField(') =>')
    this.appendStatementInput('BODY').setCheck(null)
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#f7df1e')
  }
}

Blockly.Blocks['js_array_create'] = {
  init() {
    this.appendDummyInput().appendField('array []')
    this.setOutput(true, 'Array')
    this.setColour('#f7df1e')
  }
}

Blockly.Blocks['js_object_create'] = {
  init() {
    this.appendDummyInput().appendField('object {}')
    this.setOutput(true, null)
    this.setColour('#f7df1e')
  }
}

Blockly.Blocks['js_return'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null).appendField('return')
    this.setPreviousStatement(true)
    this.setColour('#f7df1e')
  }
}

Blockly.Blocks['js_comment'] = {
  init() {
    this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'), 'TEXT')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#6a6a6a')
  }
}
