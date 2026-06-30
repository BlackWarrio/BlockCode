import * as Blockly from 'blockly'

function makeGen(name) {
  class G extends Blockly.CodeGenerator {
    constructor() { super(name); this.INDENT='    '; this.ORDER_ATOMIC=0; this.ORDER_NONE=99 }
    scrub_(block, code) { const n=block.nextConnection?.targetBlock(); return code+(n?this.blockToCode(n):'') }
  }
  const g = new G()
  for (const t of ['controls_if','logic_compare','logic_operation','logic_negate',
    'controls_repeat_ext','controls_whileUntil','controls_for','controls_forEach',
    'math_arithmetic','math_single','math_round','math_modulo',
    'text_length','text_print',
    'procedures_defnoreturn','procedures_defreturn','procedures_callnoreturn','procedures_callreturn']) {
    g.forBlock[t] = () => '/* unsupported */\n'
  }
  g.forBlock['math_number']    = (b) => [String(b.getFieldValue('NUM')), 0]
  g.forBlock['text']           = (b) => [`"${b.getFieldValue('TEXT')}"`, 0]
  g.forBlock['text_join']      = (b,g2) => { const a=[]; for(let i=0;i<b.itemCount_;i++) a.push(g2.valueToCode(b,'ADD'+i,0)||'""'); return [a.join(' + '), 0] }
  g.forBlock['logic_boolean']  = (b) => [b.getFieldValue('BOOL')==='TRUE'?'true':'false', 0]
  g.forBlock['variables_get']  = (b) => [b.getFieldValue('VAR'), 0]
  g.forBlock['variables_set']  = (b,g2) => `${b.getFieldValue('VAR')} = ${g2.valueToCode(b,'VALUE',0)||'null'};\n`
  return g
}

// ══ RUST ═════════════════════════════════════════════════════════════════════
const RS='#dea584'

Blockly.Blocks['rs_println']   = { init() { this.appendDummyInput().appendField('println!(').appendField(new Blockly.FieldTextInput('"{}"'),'FMT').appendField(',').appendField(new Blockly.FieldTextInput(''),'ARGS').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_let']       = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['let','let'],['let mut','let mut']]),'KIND').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField('=').appendField(new Blockly.FieldTextInput('0'),'VAL').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_fn']        = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['fn','fn'],['pub fn','pub fn'],['async fn','async fn']]),'VIS').appendField(new Blockly.FieldTextInput('my_fn'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')').appendField('->').appendField(new Blockly.FieldTextInput(''),'RET'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_struct']    = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['struct','struct'],['pub struct','pub struct']]),'VIS').appendField(new Blockly.FieldTextInput('MyStruct'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_enum']      = { init() { this.appendDummyInput().appendField('enum').appendField(new Blockly.FieldTextInput('MyEnum'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_impl']      = { init() { this.appendDummyInput().appendField('impl').appendField(new Blockly.FieldTextInput('MyStruct'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_match']     = { init() { this.appendDummyInput().appendField('match').appendField(new Blockly.FieldTextInput('val'),'EXPR'); this.appendStatementInput('ARMS').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_use']       = { init() { this.appendDummyInput().appendField('use').appendField(new Blockly.FieldTextInput('std::collections::HashMap'),'PATH').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_return']    = { init() { this.appendDummyInput().appendField('return').appendField(new Blockly.FieldTextInput(''),'VAL').appendField(';'); this.setPreviousStatement(true); this.setColour(RS) } }
Blockly.Blocks['rs_comment']   = { init() { this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#6a6a6a') } }
Blockly.Blocks['rs_vec']       = { init() { this.appendDummyInput().appendField('vec![').appendField(new Blockly.FieldTextInput(''),'ITEMS').appendField(']'); this.setOutput(true,null); this.setColour(RS) } }
Blockly.Blocks['rs_option']    = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['Some(','Some('],['None','None']]),'KIND').appendField(new Blockly.FieldTextInput(''),'VAL').appendField(')'); this.setOutput(true,null); this.setColour(RS) } }

const rustGenerator = makeGen('Rust')
rustGenerator.forBlock['rs_println'] = b => { const a=b.getFieldValue('ARGS'); return `println!(${b.getFieldValue('FMT')}${a?', '+a:''});\n` }
rustGenerator.forBlock['rs_let']     = b => `${b.getFieldValue('KIND')} ${b.getFieldValue('NAME')} = ${b.getFieldValue('VAL')};\n`
rustGenerator.forBlock['rs_fn']      = (b,g) => { const r=b.getFieldValue('RET'); return `${b.getFieldValue('VIS')} ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')})${r?' -> '+r:''} {\n${g.statementToCode(b,'BODY')}}\n` }
rustGenerator.forBlock['rs_struct']  = (b,g) => `${b.getFieldValue('VIS')} ${b.getFieldValue('NAME')} {\n${g.statementToCode(b,'BODY')}}\n`
rustGenerator.forBlock['rs_enum']    = (b,g) => `enum ${b.getFieldValue('NAME')} {\n${g.statementToCode(b,'BODY')}}\n`
rustGenerator.forBlock['rs_impl']    = (b,g) => `impl ${b.getFieldValue('NAME')} {\n${g.statementToCode(b,'BODY')}}\n`
rustGenerator.forBlock['rs_match']   = (b,g) => `match ${b.getFieldValue('EXPR')} {\n${g.statementToCode(b,'ARMS')}}\n`
rustGenerator.forBlock['rs_use']     = b => `use ${b.getFieldValue('PATH')};\n`
rustGenerator.forBlock['rs_return']  = b => `return ${b.getFieldValue('VAL')};\n`
rustGenerator.forBlock['rs_comment'] = b => `// ${b.getFieldValue('TEXT')}\n`
rustGenerator.forBlock['rs_vec']     = b => [`vec![${b.getFieldValue('ITEMS')}]`, 0]
rustGenerator.forBlock['rs_option']  = b => { const k=b.getFieldValue('KIND'); return k==='None' ? ['None',0] : [`Some(${b.getFieldValue('VAL')})`,0] }

// ══ PHP ══════════════════════════════════════════════════════════════════════
const PHP='#4F5D95'

Blockly.Blocks['php_echo']     = { init() { this.appendValueInput('VALUE').setCheck(null).appendField('echo'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_var']      = { init() { this.appendDummyInput().appendField('$').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField('=').appendField(new Blockly.FieldTextInput("'value'"),'VAL').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_function'] = { init() { this.appendDummyInput().appendField('function').appendField(new Blockly.FieldTextInput('myFn'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_class']    = { init() { this.appendDummyInput().appendField('class').appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField('extends').appendField(new Blockly.FieldTextInput(''),'PARENT'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_array']    = { init() { this.appendDummyInput().appendField('array(').appendField(new Blockly.FieldTextInput(''),'ITEMS').appendField(')'); this.setOutput(true,null); this.setColour(PHP) } }
Blockly.Blocks['php_foreach']  = { init() { this.appendDummyInput().appendField('foreach($').appendField(new Blockly.FieldTextInput('arr'),'ARR').appendField('as $').appendField(new Blockly.FieldTextInput('item'),'VAR').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_return']   = { init() { this.appendDummyInput().appendField('return').appendField(new Blockly.FieldTextInput(''),'VAL').appendField(';'); this.setPreviousStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_comment']  = { init() { this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#6a6a6a') } }
Blockly.Blocks['php_require']  = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['require_once','require_once'],['include','include']]),'KIND').appendField(new Blockly.FieldTextInput("'file.php'"),'PATH').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }
Blockly.Blocks['php_print_r']  = { init() { this.appendDummyInput().appendField('print_r($').appendField(new Blockly.FieldTextInput('var'),'VAR').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(PHP) } }

const phpGenerator = makeGen('PHP')
phpGenerator.forBlock['php_echo']     = (b,g) => `echo ${g.valueToCode(b,'VALUE',g.ORDER_NONE)||"''"} ;\n`
phpGenerator.forBlock['php_var']      = b => `$${b.getFieldValue('NAME')} = ${b.getFieldValue('VAL')};\n`
phpGenerator.forBlock['php_function'] = (b,g) => `function ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) {\n${g.statementToCode(b,'BODY')}}\n`
phpGenerator.forBlock['php_class']    = (b,g) => { const p=b.getFieldValue('PARENT'); return `class ${b.getFieldValue('NAME')}${p?` extends ${p}`:''} {\n${g.statementToCode(b,'BODY')}}\n` }
phpGenerator.forBlock['php_array']    = b => [`array(${b.getFieldValue('ITEMS')})`, 0]
phpGenerator.forBlock['php_foreach']  = (b,g) => `foreach($${b.getFieldValue('ARR')} as $${b.getFieldValue('VAR')}) {\n${g.statementToCode(b,'BODY')}}\n`
phpGenerator.forBlock['php_return']   = b => `return ${b.getFieldValue('VAL')};\n`
phpGenerator.forBlock['php_comment']  = b => `// ${b.getFieldValue('TEXT')}\n`
phpGenerator.forBlock['php_require']  = b => `${b.getFieldValue('KIND')} ${b.getFieldValue('PATH')};\n`
phpGenerator.forBlock['php_print_r']  = b => `print_r($${b.getFieldValue('VAR')});\n`

export { rustGenerator, phpGenerator }
