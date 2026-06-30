import * as Blockly from 'blockly'

Blockly.Blocks['java_sysout'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null).appendField('System.out.println')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#b07219')
  }
}

Blockly.Blocks['java_var_declare'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null)
      .appendField(new Blockly.FieldDropdown([['int','int'],['String','String'],['double','double'],['boolean','boolean'],['var','var']]), 'TYPE')
      .appendField(new Blockly.FieldTextInput('x'), 'NAME').appendField('=')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#b07219')
  }
}

Blockly.Blocks['java_class_def'] = {
  init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['public','public'],['private','private'],['protected','protected']]), 'ACCESS')
      .appendField('class').appendField(new Blockly.FieldTextInput('MyClass'), 'NAME')
    this.appendStatementInput('BODY').setCheck(null).appendField('body')
    this.setColour('#b07219')
  }
}

Blockly.Blocks['java_method_def'] = {
  init() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['public','public'],['private','private'],['protected','protected']]), 'ACCESS')
      .appendField(new Blockly.FieldDropdown([['void','void'],['int','int'],['String','String'],['boolean','boolean']]), 'RETURN')
      .appendField(new Blockly.FieldTextInput('myMethod'), 'NAME')
      .appendField('(').appendField(new Blockly.FieldTextInput(''), 'PARAMS').appendField(')')
    this.appendStatementInput('BODY').setCheck(null)
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#b07219')
  }
}

Blockly.Blocks['java_return'] = {
  init() {
    this.appendValueInput('VALUE').setCheck(null).appendField('return')
    this.setPreviousStatement(true)
    this.setColour('#b07219')
  }
}

Blockly.Blocks['java_comment'] = {
  init() {
    this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'), 'TEXT')
    this.setPreviousStatement(true); this.setNextStatement(true)
    this.setColour('#6a6a6a')
  }
}

Blockly.Blocks['java_new_object'] = {
  init() {
    this.appendDummyInput()
      .appendField('new').appendField(new Blockly.FieldTextInput('ClassName'), 'CLASS')
      .appendField('(').appendField(new Blockly.FieldTextInput(''), 'ARGS').appendField(')')
    this.setOutput(true, null)
    this.setColour('#b07219')
  }
}
