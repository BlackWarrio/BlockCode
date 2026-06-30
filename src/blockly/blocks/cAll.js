import * as Blockly from 'blockly'

const CC = '#555555'
const G  = '#6a6a6a'

// ── C BLOCKS ─────────────────────────────────────────────────────────────────
Blockly.Blocks['c_include']      = { init() { this.appendDummyInput().appendField('#include <').appendField(new Blockly.FieldTextInput('stdio.h'),'HDR').appendField('>'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_printf']       = { init() { this.appendDummyInput().appendField('printf(').appendField(new Blockly.FieldTextInput('"%s\\n"'),'FMT').appendField(',').appendField(new Blockly.FieldTextInput(''),'ARGS').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_scanf']        = { init() { this.appendDummyInput().appendField('scanf(').appendField(new Blockly.FieldTextInput('"%d"'),'FMT').appendField(',&').appendField(new Blockly.FieldTextInput('x'),'VAR').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_var_declare']  = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['int','int'],['float','float'],['double','double'],['char','char'],['long','long'],['void*','void*']]),'TYPE').appendField(new Blockly.FieldTextInput('x'),'NAME').appendField('=').appendField(new Blockly.FieldTextInput('0'),'VAL').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_function']     = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['int','int'],['void','void'],['char*','char*'],['float','float']]),'RET').appendField(new Blockly.FieldTextInput('myFunc'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_return']       = { init() { this.appendDummyInput().appendField('return').appendField(new Blockly.FieldTextInput('0'),'VAL').appendField(';'); this.setPreviousStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_comment']      = { init() { this.appendDummyInput().appendField('//').appendField(new Blockly.FieldTextInput('comment'),'TEXT'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(G) } }
Blockly.Blocks['c_pointer']      = { init() { this.appendDummyInput().appendField(new Blockly.FieldDropdown([['int*','int*'],['char*','char*'],['void*','void*']]),'TYPE').appendField('*').appendField(new Blockly.FieldTextInput('ptr'),'NAME').appendField('=').appendField(new Blockly.FieldTextInput('NULL'),'VAL').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_malloc']       = { init() { this.appendDummyInput().appendField('malloc(sizeof(').appendField(new Blockly.FieldTextInput('int'),'TYPE').appendField(') *').appendField(new Blockly.FieldNumber(10),'N').appendField(')'); this.setOutput(true,null); this.setColour(CC) } }
Blockly.Blocks['c_free']         = { init() { this.appendDummyInput().appendField('free(').appendField(new Blockly.FieldTextInput('ptr'),'VAR').appendField(')'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_struct']       = { init() { this.appendDummyInput().appendField('struct').appendField(new Blockly.FieldTextInput('Point'),'NAME'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(CC) } }
Blockly.Blocks['c_main']         = { init() { this.appendDummyInput().appendField('int main(int argc, char *argv[])'); this.appendStatementInput('BODY').setCheck(null); this.setColour(CC) } }

// ── C++ EXTRA BLOCKS ─────────────────────────────────────────────────────────
Blockly.Blocks['cpp_cout']       = { init() { this.appendDummyInput().appendField('cout <<').appendField(new Blockly.FieldTextInput('"Hello"'),'VAL').appendField('<< endl'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }
Blockly.Blocks['cpp_cin']        = { init() { this.appendDummyInput().appendField('cin >>').appendField(new Blockly.FieldTextInput('x'),'VAR'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }
Blockly.Blocks['cpp_class']      = { init() { this.appendDummyInput().appendField('class').appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField(':').appendField(new Blockly.FieldDropdown([['public','public'],['private','private'],['','(none)']]),'ACC').appendField(new Blockly.FieldTextInput(''),'PARENT'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }
Blockly.Blocks['cpp_constructor']= { init() { this.appendDummyInput().appendField(new Blockly.FieldTextInput('MyClass'),'NAME').appendField('(').appendField(new Blockly.FieldTextInput(''),'PARAMS').appendField(')'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }
Blockly.Blocks['cpp_vector']     = { init() { this.appendDummyInput().appendField('vector<').appendField(new Blockly.FieldTextInput('int'),'TYPE').appendField('>').appendField(new Blockly.FieldTextInput('v'),'NAME'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }
Blockly.Blocks['cpp_namespace']  = { init() { this.appendDummyInput().appendField('using namespace').appendField(new Blockly.FieldTextInput('std'),'NS').appendField(';'); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }
Blockly.Blocks['cpp_template']   = { init() { this.appendDummyInput().appendField('template<typename').appendField(new Blockly.FieldTextInput('T'),'T').appendField('>'); this.appendStatementInput('BODY').setCheck(null); this.setPreviousStatement(true); this.setNextStatement(true); this.setColour('#f34b7d') } }

// ── C Generator ───────────────────────────────────────────────────────────────
class CGenerator extends Blockly.CodeGenerator {
  constructor(name='C') { super(name); this.INDENT='    '; this.ORDER_ATOMIC=0; this.ORDER_NONE=99 }
  scrub_(block, code) { const n=block.nextConnection?.targetBlock(); return code+(n?this.blockToCode(n):'') }
}
const cGenerator = new CGenerator('C')
const cppGenerator = new CGenerator('CPP')

const stub = () => '/* unsupported */\n'
const commons = ['controls_if','logic_compare','logic_operation','logic_negate',
  'controls_repeat_ext','controls_whileUntil','controls_for','controls_forEach',
  'math_arithmetic','math_single','math_round','math_modulo',
  'text_length','text_print',
  'procedures_defnoreturn','procedures_defreturn','procedures_callnoreturn','procedures_callreturn']
for (const t of commons) { cGenerator.forBlock[t]=stub; cppGenerator.forBlock[t]=stub }

// Core value blocks for both C and C++
for (const gen of [cGenerator, cppGenerator]) {
  gen.forBlock['math_number']   = (b) => [String(b.getFieldValue('NUM')), 0]
  gen.forBlock['text']          = (b) => [`"${b.getFieldValue('TEXT')}"`, 0]
  gen.forBlock['text_join']     = (b,g) => { const a=[]; for(let i=0;i<b.itemCount_;i++) a.push(g.valueToCode(b,'ADD'+i,0)||'""'); return [a.join(' "+" '), 0] }
  gen.forBlock['logic_boolean'] = (b) => [b.getFieldValue('BOOL')==='TRUE'?'1':'0', 0]
  gen.forBlock['variables_get'] = (b) => [b.getFieldValue('VAR'), 0]
  gen.forBlock['variables_set'] = (b,g) => `${b.getFieldValue('VAR')} = ${g.valueToCode(b,'VALUE',0)||'0'};\n`
}

for (const gen of [cGenerator, cppGenerator]) {
  gen.forBlock['c_include']     = b => `#include <${b.getFieldValue('HDR')}>\n`
  gen.forBlock['c_printf']      = b => `printf(${b.getFieldValue('FMT')}${b.getFieldValue('ARGS')?', '+b.getFieldValue('ARGS'):''});\n`
  gen.forBlock['c_scanf']       = b => `scanf(${b.getFieldValue('FMT')}, &${b.getFieldValue('VAR')});\n`
  gen.forBlock['c_var_declare'] = b => `${b.getFieldValue('TYPE')} ${b.getFieldValue('NAME')} = ${b.getFieldValue('VAL')};\n`
  gen.forBlock['c_function']    = (b,g) => `${b.getFieldValue('RET')} ${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) {\n${g.statementToCode(b,'BODY')}}\n`
  gen.forBlock['c_return']      = b => `return ${b.getFieldValue('VAL')};\n`
  gen.forBlock['c_comment']     = b => `// ${b.getFieldValue('TEXT')}\n`
  gen.forBlock['c_pointer']     = b => `${b.getFieldValue('TYPE')} *${b.getFieldValue('NAME')} = ${b.getFieldValue('VAL')};\n`
  gen.forBlock['c_malloc']      = b => [`malloc(sizeof(${b.getFieldValue('TYPE')}) * ${b.getFieldValue('N')})`, 0]
  gen.forBlock['c_free']        = b => `free(${b.getFieldValue('VAR')});\n`
  gen.forBlock['c_struct']      = (b,g) => `struct ${b.getFieldValue('NAME')} {\n${g.statementToCode(b,'BODY')}};\n`
  gen.forBlock['c_main']        = (b,g) => `int main(int argc, char *argv[]) {\n${g.statementToCode(b,'BODY')}}\n`
}

cppGenerator.forBlock['cpp_cout']        = b => `cout << ${b.getFieldValue('VAL')} << endl;\n`
cppGenerator.forBlock['cpp_cin']         = b => `cin >> ${b.getFieldValue('VAR')};\n`
cppGenerator.forBlock['cpp_class']       = (b,g) => { const p=b.getFieldValue('PARENT'),a=b.getFieldValue('ACC'); return `class ${b.getFieldValue('NAME')}${p?` : ${a} ${p}`:''} {\n${g.statementToCode(b,'BODY')}};\n` }
cppGenerator.forBlock['cpp_constructor'] = (b,g) => `${b.getFieldValue('NAME')}(${b.getFieldValue('PARAMS')}) {\n${g.statementToCode(b,'BODY')}}\n`
cppGenerator.forBlock['cpp_vector']      = b => `vector<${b.getFieldValue('TYPE')}> ${b.getFieldValue('NAME')};\n`
cppGenerator.forBlock['cpp_namespace']   = b => `using namespace ${b.getFieldValue('NS')};\n`
cppGenerator.forBlock['cpp_template']    = (b,g) => `template<typename ${b.getFieldValue('T')}>\n${g.statementToCode(b,'BODY')}`

export { cGenerator, cppGenerator }
