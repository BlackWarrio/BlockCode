import * as Blockly from 'blockly'

// ── Shared generator factory ──────────────────────────────────────────────────
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
  // Core value blocks
  g.forBlock['math_number']    = (b) => [String(b.getFieldValue('NUM')), 0]
  g.forBlock['text']           = (b) => [`"${b.getFieldValue('TEXT')}"`, 0]
  g.forBlock['text_join']      = (b,g2) => { const a=[]; for(let i=0;i<b.itemCount_;i++) a.push(g2.valueToCode(b,'ADD'+i,0)||'""'); return [a.join(' + '), 0] }
  g.forBlock['logic_boolean']  = (b) => [b.getFieldValue('BOOL')==='TRUE'?'true':'false', 0]
  g.forBlock['variables_get']  = (b) => [b.getFieldValue('VAR'), 0]
  g.forBlock['variables_set']  = (b,g2) => `${b.getFieldValue('VAR')} = ${g2.valueToCode(b,'VALUE',0)||'nil'}\n`
  return g
}

// ══ RUBY ═════════════════════════════════════════════════════════════════════
const RB='#701516'
;[
  ['rb_puts',    () => { this.appendValueInput('VALUE').setCheck(null).appendField('puts'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RB) }],
  ['rb_print',   () => { this.appendValueInput('VALUE').setCheck(null).appendField('print'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RB) }],
  ['rb_gets',    () => { this.appendDummyInput().appendField('gets.chomp'); this.setOutput(true,'String'); this.setColour(RB) }],
  ['rb_def',     () => { this.appendDummyInput().appendField('def').appendField(new Blockly.FieldTextInput('my_method'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.appendDummyInput().appendField('end'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RB) }],
  ['rb_class',   () => { this.appendDummyInput().appendField('class').appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField('<').appendField(new Blockly.FieldTextInput(''),'PARENT'); this.appendStatementInput('BODY').setCheck(null); this.appendDummyInput().appendField('end'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RB) }],
  ['rb_require', () => { this.appendDummyInput().appendField('require').appendField(new Blockly.FieldTextInput("'json'"),'MOD'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RB) }],
  ['rb_symbol',  () => { this.appendDummyInput().appendField(':').appendField(new Blockly.FieldTextInput('my_key'),'NAME'); this.setOutput(true,null); this.setColour(RB) }],
  ['rb_hash',    () => { this.appendDummyInput().appendField('{}'); this.setOutput(true,null); this.setColour(RB) }],
  ['rb_array',   () => { this.appendDummyInput().appendField('[]'); this.setOutput(true,'Array'); this.setColour(RB) }],
  ['rb_do_block',() => { this.appendDummyInput().appendField(new Blockly.FieldTextInput('arr'),'OBJ').appendField('.each do |').appendField(new Blockly.FieldTextInput('item'),'VAR').appendField('|'); this.appendStatementInput('BODY').setCheck(null); this.appendDummyInput().appendField('end'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(RB) }],
  ['rb_return',  () => { this.appendValueInput('VALUE').setCheck(null).appendField('return'); this.setPreviousStatement(true); this.setColour(RB) }],
  ['rb_comment', () => { this.appendDummyInput().appendField('#').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#6a6a6a') }],
].forEach(([type,initFn]) => { Blockly.Blocks[type] = { init: initFn } })

const rubyGenerator = makeGen('Ruby')
rubyGenerator.forBlock['rb_puts']     = (b,g) => `puts ${g.valueToCode(b,'VALUE',g.ORDER_NONE)||'""'}\n`
rubyGenerator.forBlock['rb_print']    = (b,g) => `print ${g.valueToCode(b,'VALUE',g.ORDER_NONE)||'""'}\n`
rubyGenerator.forBlock['rb_gets']     = (_,g) => ['gets.chomp', g.ORDER_ATOMIC]
rubyGenerator.forBlock['rb_def']      = (b,g) => `def ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')})\n${g.statementToCode(b,'BODY')}end\n`
rubyGenerator.forBlock['rb_class']    = (b,g) => { const p=b.getFieldValue('PARENT'); return `class ${b.getFieldValue('NAME')}${p?` < ${p}`:''}\n${g.statementToCode(b,'BODY')}end\n` }
rubyGenerator.forBlock['rb_require']  = b => `require ${b.getFieldValue('MOD')}\n`
rubyGenerator.forBlock['rb_symbol']   = b => [`:${b.getFieldValue('NAME')}`, 0]
rubyGenerator.forBlock['rb_hash']     = (_,g) => ['{}', g.ORDER_ATOMIC]
rubyGenerator.forBlock['rb_array']    = (_,g) => ['[]', g.ORDER_ATOMIC]
rubyGenerator.forBlock['rb_do_block'] = (b,g) => `${b.getFieldValue('OBJ')}.each do |${b.getFieldValue('VAR')}|\n${g.statementToCode(b,'BODY')}end\n`
rubyGenerator.forBlock['rb_return']   = (b,g) => `return ${g.valueToCode(b,'VALUE',g.ORDER_NONE)}\n`
rubyGenerator.forBlock['rb_comment']  = b => `# ${b.getFieldValue('TEXT')}\n`

// ══ GO ═══════════════════════════════════════════════════════════════════════
const GO='#00ACD7'
;[
  ['go_fmt_println', () => { this.appendValueInput('VALUE').setCheck(null).appendField('fmt.Println('); this.appendDummyInput().appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_fmt_printf',  () => { this.appendDummyInput().appendField('fmt.Printf(').appendField(new Blockly.FieldTextInput('"%v\\n"'),'FMT').appendField(',').appendField(new Blockly.FieldTextInput('val'),'ARGS').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_var',         () => { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['var','var'],[':=',':=']]),'KIND').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField('=').appendField(new Blockly.FieldTextInput('0'),'VAL'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_func',        () => { this.appendDummyInput().appendField('func').appendField(new Blockly.FieldTextInput('myFunc'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')').appendField(new Blockly.FieldTextInput(''),'RET'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_struct',      () => { this.appendDummyInput().appendField('type').appendField(new Blockly.FieldTextInput('MyStruct'),'NAME').appendField('struct'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_interface',   () => { this.appendDummyInput().appendField('type').appendField(new Blockly.FieldTextInput('MyInterface'),'NAME').appendField('interface'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_goroutine',   () => { this.appendDummyInput().appendField('go').appendField(new Blockly.FieldTextInput('myFunc()'),'CALL'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_channel',     () => { this.appendDummyInput().appendField(new Blockly.FieldTextInput('ch'),'NAME').appendField(':= make(chan').appendField(new Blockly.FieldTextInput('int'),'TYPE').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_import',      () => { this.appendDummyInput().appendField('import').appendField(new Blockly.FieldTextInput('"fmt"'),'PKG'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(GO) }],
  ['go_return',      () => { this.appendDummyInput().appendField('return').appendField(new Blockly.FieldTextInput(''),'VAL'); this.setPreviousStatement(true); this.setColour(GO) }],
  ['go_comment',     () => { this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#6a6a6a') }],
].forEach(([type,initFn]) => { Blockly.Blocks[type] = { init: initFn } })

const goGenerator = makeGen('Go')
goGenerator.forBlock['go_fmt_println'] = (b,g) => `fmt.Println(${g.valueToCode(b,'VALUE',g.ORDER_NONE)||'""'})\n`
goGenerator.forBlock['go_fmt_printf']  = b => `fmt.Printf(${b.getFieldValue('FMT')}, ${b.getFieldValue('ARGS')})\n`
goGenerator.forBlock['go_var']         = b => `${b.getFieldValue('KIND')} ${b.getFieldValue('NAME')} = ${b.getFieldValue('VAL')}\n`
goGenerator.forBlock['go_func']        = (b,g) => `func ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) ${b.getFieldValue('RET')} {\n${g.statementToCode(b,'BODY')}}\n`
goGenerator.forBlock['go_struct']      = (b,g) => `type ${b.getFieldValue('NAME')} struct {\n${g.statementToCode(b,'BODY')}}\n`
goGenerator.forBlock['go_interface']   = (b,g) => `type ${b.getFieldValue('NAME')} interface {\n${g.statementToCode(b,'BODY')}}\n`
goGenerator.forBlock['go_goroutine']   = b => `go ${b.getFieldValue('CALL')}\n`
goGenerator.forBlock['go_channel']     = b => `${b.getFieldValue('NAME')} := make(chan ${b.getFieldValue('TYPE')})\n`
goGenerator.forBlock['go_import']      = b => `import ${b.getFieldValue('PKG')}\n`
goGenerator.forBlock['go_return']      = b => `return ${b.getFieldValue('VAL')}\n`
goGenerator.forBlock['go_comment']     = b => `// ${b.getFieldValue('TEXT')}\n`

export { rubyGenerator, goGenerator }
