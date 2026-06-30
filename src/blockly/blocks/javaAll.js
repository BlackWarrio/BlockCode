import * as Blockly from 'blockly'

const JV = '#b07219'
const G  = '#6a6a6a'

Blockly.Blocks['java_sysout']       = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('System.out.println'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_syserr']       = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('System.err.println'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_var_declare']  = { init() { this.appendValueInput('VALUE').setCheck(null).appendField(new Blockly.FieldDropdown([['int','int'],['String','String'],['double','double'],['boolean','boolean'],['long','long'],['float','float'],['var','var']]),'TYPE').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField('='); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_class_def']    = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['public','public'],['private','private'],['protected','protected']]),'ACCESS').appendField(new Blockly.FieldDropdown([['',''],['abstract','abstract'],['final','final']]),'MOD').appendField('class').appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField('extends').appendField(new Blockly.FieldTextInput(''),'PARENT'); this.appendStatementInput('BODY').setCheck(null); this.setColour(JV) } }
Blockly.Blocks['java_interface']    = { init() { this.appendDummyInput().appendField('interface').appendField(new Blockly.FieldTextInput('IFoo'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_method_def']   = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['public','public'],['private','private'],['protected','protected']]),'ACCESS').appendField(new Blockly.FieldDropdown([['void','void'],['int','int'],['String','String'],['boolean','boolean'],['double','double']]),'RETURN').appendField(new Blockly.FieldTextInput('myMethod'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_return']       = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('return'); this.setPreviousStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_comment']      = { init() { this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(G) } }
Blockly.Blocks['java_new_object']   = { init() { this.appendDummyInput().appendField('new').appendField(new Blockly.FieldTextInput('ClassName'),'CLASS').appendField('(').appendField(new Blockly.FieldTextInput(''),'ARGS').appendField(')'); this.setOutput(true,null); this.setColour(JV) } }
Blockly.Blocks['java_try_catch']    = { init() { this.appendStatementInput('TRY').setCheck(null).appendField('try'); this.appendDummyInput().appendField('catch(').appendField(new Blockly.FieldTextInput('Exception e'),'EXC').appendField(')'); this.appendStatementInput('CATCH').setCheck(null); this.appendStatementInput('FINALLY').setCheck(null).appendField('finally'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#e06c75') } }
Blockly.Blocks['java_throw']        = { init() { this.appendDummyInput().appendField('throw new').appendField(new Blockly.FieldTextInput('RuntimeException'),'EXC').appendField('(').appendField(new Blockly.FieldTextInput('"msg"'),'MSG').appendField(')'); this.setPreviousStatement(true); this.setColour('#e06c75') } }
Blockly.Blocks['java_arraylist']    = { init() { this.appendDummyInput().appendField('new ArrayList<').appendField(new Blockly.FieldTextInput('String'),'TYPE').appendField('>()'); this.setOutput(true,null); this.setColour(JV) } }
Blockly.Blocks['java_hashmap']      = { init() { this.appendDummyInput().appendField('new HashMap<').appendField(new Blockly.FieldTextInput('String'),'K').appendField(',').appendField(new Blockly.FieldTextInput('Object'),'V').appendField('>()'); this.setOutput(true,null); this.setColour(JV) } }
Blockly.Blocks['java_for_each']     = { init() { this.appendDummyInput().appendField('for(').appendField(new Blockly.FieldTextInput('String'),'TYPE').appendField(new Blockly.FieldTextInput('item'),'VAR').appendField(':').appendField(new Blockly.FieldTextInput('list'),'LIST').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_scanner']      = { init() { this.appendDummyInput().appendField('Scanner').appendField(new Blockly.FieldTextInput('sc'),'NAME').appendField('= new Scanner(System.in)'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }
Blockly.Blocks['java_import']       = { init() { this.appendDummyInput().appendField('import').appendField(new Blockly.FieldTextInput('java.util.ArrayList'),'PKG').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(JV) } }

// Java generator
class JavaGenerator extends Blockly.CodeGenerator {
  constructor() { super('Java'); this.INDENT='    '; this.ORDER_ATOMIC=0; this.ORDER_NONE=99 }
  scrub_(block, code) { const n=block.nextConnection?.targetBlock(); return code+(n?this.blockToCode(n):'') }
  init(ws) { if (ws) { this.nameDB_ = { getName: (name) => name, reset: () => {} } } }
}
const javaGenerator = new JavaGenerator()

const stub = () => '/* unsupported */\n'
for (const t of ['controls_if','logic_compare','logic_operation','logic_negate','logic_boolean',
  'controls_repeat_ext','controls_whileUntil','controls_for','controls_forEach',
  'math_arithmetic','math_single','math_round','math_modulo',
  'text_length','text_print',
  'procedures_defnoreturn','procedures_defreturn','procedures_callnoreturn','procedures_callreturn']) {
  javaGenerator.forBlock[t] = stub
}

// Core value blocks
javaGenerator.forBlock['math_number']    = (b) => [String(b.getFieldValue('NUM')), 0]
javaGenerator.forBlock['text']           = (b) => [`"${b.getFieldValue('TEXT')}"`, 0]
javaGenerator.forBlock['text_join']      = (b,g) => {
  const items = []
  for (let i = 0; i < b.itemCount_; i++) items.push(g.valueToCode(b, 'ADD' + i, 0) || '""')
  return [items.join(' + '), 0]
}
javaGenerator.forBlock['logic_boolean']  = (b) => [b.getFieldValue('BOOL') === 'TRUE' ? 'true' : 'false', 0]
// Variables
javaGenerator.forBlock['variables_get']  = (b) => [b.getFieldValue('VAR'), 0]
javaGenerator.forBlock['variables_set']  = (b,g) => `${b.getFieldValue('VAR')} = ${g.valueToCode(b,'VALUE',0)||'null'};\n`

const j = javaGenerator
j.forBlock['java_sysout']      = (b) => `System.out.println(${j.valueToCode(b,'VALUE',j.ORDER_NONE)||'""'});\n`
j.forBlock['java_syserr']      = (b) => `System.err.println(${j.valueToCode(b,'VALUE',j.ORDER_NONE)||'""'});\n`
j.forBlock['java_var_declare'] = (b) => `${b.getFieldValue('TYPE')} ${b.getFieldValue('NAME')} = ${j.valueToCode(b,'VALUE',j.ORDER_ASSIGNMENT)||'null'};\n`
j.forBlock['java_class_def']   = (b) => { const p=b.getFieldValue('PARENT'),m=b.getFieldValue('MOD'); return `${b.getFieldValue('ACCESS')} ${m?m+' ':''}class ${b.getFieldValue('NAME')}${p?` extends ${p}`:''} {\n${j.statementToCode(b,'BODY')}}\n` }
j.forBlock['java_interface']   = (b) => `interface ${b.getFieldValue('NAME')} {\n${j.statementToCode(b,'BODY')}}\n`
j.forBlock['java_method_def']  = (b) => `${b.getFieldValue('ACCESS')} ${b.getFieldValue('RETURN')} ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) {\n${j.statementToCode(b,'BODY')}}\n`
j.forBlock['java_return']      = (b) => `return ${j.valueToCode(b,'VALUE',j.ORDER_NONE)};\n`
j.forBlock['java_comment']     = (b) => `// ${b.getFieldValue('TEXT')}\n`
j.forBlock['java_new_object']  = (b) => [`new ${b.getFieldValue('CLASS')}(${b.getFieldValue('ARGS')})`, j.ORDER_ATOMIC]
j.forBlock['java_try_catch']   = (b) => `try {\n${j.statementToCode(b,'TRY')}} catch(${b.getFieldValue('EXC')}) {\n${j.statementToCode(b,'CATCH')}} finally {\n${j.statementToCode(b,'FINALLY')}}\n`
j.forBlock['java_throw']       = (b) => `throw new ${b.getFieldValue('EXC')}(${b.getFieldValue('MSG')});\n`
j.forBlock['java_arraylist']   = (b) => [`new ArrayList<${b.getFieldValue('TYPE')}>()`, j.ORDER_ATOMIC]
j.forBlock['java_hashmap']     = (b) => [`new HashMap<${b.getFieldValue('K')},${b.getFieldValue('V')}>()`, j.ORDER_ATOMIC]
j.forBlock['java_for_each']    = (b) => `for(${b.getFieldValue('TYPE')} ${b.getFieldValue('VAR')} : ${b.getFieldValue('LIST')}) {\n${j.statementToCode(b,'BODY')}}\n`
j.forBlock['java_scanner']     = (b) => `Scanner ${b.getFieldValue('NAME')} = new Scanner(System.in);\n`
j.forBlock['java_import']      = (b) => `import ${b.getFieldValue('PKG')};\n`

export { javaGenerator }
