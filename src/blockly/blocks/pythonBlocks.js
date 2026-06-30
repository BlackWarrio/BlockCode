import * as Blockly from 'blockly'

Blockly.Blocks['py_print'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null).appendField('print')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#3572A5'); this.setTooltip('Python print()')
  }
}

Blockly.Blocks['py_input'] = {
  init() {
    this.appendValueInput('PROMPT').setCheck('String').appendField('input')
    this.setOutput(true, 'String')
    this.setColour('#3572A5'); this.setTooltip('Python input()')
  }
}

Blockly.Blocks['py_list_create'] = {
  init() {
    this.appendDummyInput().appendField('list [')
    this.appendValueInput('ITEMS').setCheck(null)
    this.appendDummyInput().appendField(']')
    this.setOutput(true, 'Array')
    this.setColour('#3572A5')
  }
}

Blockly.Blocks['py_dict_create'] = {
  init() {
    this.appendDummyInput().appendField('dict {}')
    this.setOutput(true, null)
    this.setColour('#3572A5')
  }
}

Blockly.Blocks['py_import'] = {
  init() {
    this.appendDummyInput().appendField('import').appendField(new Blockly.FieldTextInput('os'), 'MODULE')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#3572A5')
  }
}

Blockly.Blocks['py_class_def'] = {
  init() {
    this.appendDummyInput().appendField('class').appendField(new Blockly.FieldTextInput('MyClass'), 'NAME')
    this.appendStatementInput('BODY').setCheck(null).appendField('body')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#3572A5')
  }
}

Blockly.Blocks['py_function_def'] = {
  init() {
    this.appendDummyInput().appendField('def').appendField(new Blockly.FieldTextInput('my_func'), 'NAME')
      .appendField('(').appendField(new Blockly.FieldTextInput(''), 'PARAMS').appendField(')')
    this.appendStatementInput('BODY').setCheck(null)
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#3572A5')
  }
}

Blockly.Blocks['py_return'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null).appendField('return')
    this.setPreviousStatement(true)
    this.setColour('#3572A5')
  }
}

Blockly.Blocks['py_comment'] = {
  init() {
    this.appendDummyInput().appendField('#').appendField(new Blockly.FieldTextInput('comment'), 'TEXT')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#6a6a6a')
  }
}
