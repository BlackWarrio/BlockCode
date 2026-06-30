import * as Blockly from 'blockly'
import { pythonGenerator } from 'blockly/python'

// ── PYTHON LIBRARY BLOCKS ────────────────────────────────────────────────────
// These blocks are registered at startup but only shown in the toolbox
// when the user places an import block with the matching library name.

const LIB = '#7e57c2'  // purple for library blocks

// ── pyautogui ────────────────────────────────────────────────────────────────
Blockly.Blocks['pyag_moveto'] = { init() {
  this.appendDummyInput().appendField('pyautogui.moveTo(')
    .appendField(new Blockly.FieldNumber(0), 'X').appendField(',')
    .appendField(new Blockly.FieldNumber(0), 'Y').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pyag_click'] = { init() {
  this.appendDummyInput().appendField('pyautogui.click(')
    .appendField(new Blockly.FieldNumber(0), 'X').appendField(',')
    .appendField(new Blockly.FieldNumber(0), 'Y').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pyag_typewrite'] = { init() {
  this.appendValueInput('TEXT').setCheck('String').appendField('pyautogui.typewrite(')
  this.appendDummyInput().appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pyag_hotkey'] = { init() {
  this.appendDummyInput().appendField('pyautogui.hotkey(')
    .appendField(new Blockly.FieldTextInput('ctrl'), 'K1').appendField(',')
    .appendField(new Blockly.FieldTextInput('c'), 'K2').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pyag_screenshot'] = { init() {
  this.appendDummyInput().appendField('pyautogui.screenshot()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pyag_scroll'] = { init() {
  this.appendDummyInput().appendField('pyautogui.scroll(')
    .appendField(new Blockly.FieldNumber(3), 'CLICKS').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pyag_alert'] = { init() {
  this.appendValueInput('TEXT').setCheck('String').appendField('pyautogui.alert(')
  this.appendDummyInput().appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['pyag_moveto']    = b => `pyautogui.moveTo(${b.getFieldValue('X')}, ${b.getFieldValue('Y')})\n`
pythonGenerator.forBlock['pyag_click']     = b => `pyautogui.click(${b.getFieldValue('X')}, ${b.getFieldValue('Y')})\n`
pythonGenerator.forBlock['pyag_typewrite'] = (b,g) => `pyautogui.typewrite(${g.valueToCode(b,'TEXT',g.ORDER_NONE)||"''"})\n`
pythonGenerator.forBlock['pyag_hotkey']    = b => `pyautogui.hotkey('${b.getFieldValue('K1')}', '${b.getFieldValue('K2')}')\n`
pythonGenerator.forBlock['pyag_screenshot']= (_,g) => ['pyautogui.screenshot()', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['pyag_scroll']    = b => `pyautogui.scroll(${b.getFieldValue('CLICKS')})\n`
pythonGenerator.forBlock['pyag_alert']     = (b,g) => `pyautogui.alert(${g.valueToCode(b,'TEXT',g.ORDER_NONE)||"''"})\n`

// ── pygame ───────────────────────────────────────────────────────────────────
Blockly.Blocks['pg_init'] = { init() {
  this.appendDummyInput().appendField('pygame.init()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_display'] = { init() {
  this.appendDummyInput().appendField('pygame.display.set_mode((')
    .appendField(new Blockly.FieldNumber(800), 'W').appendField(',')
    .appendField(new Blockly.FieldNumber(600), 'H').appendField('))')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pg_set_caption'] = { init() {
  this.appendDummyInput().appendField('pygame.display.set_caption(')
    .appendField(new Blockly.FieldTextInput('My Game'), 'TITLE').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_fill'] = { init() {
  this.appendDummyInput().appendField('screen.fill((')
    .appendField(new Blockly.FieldNumber(0), 'R').appendField(',')
    .appendField(new Blockly.FieldNumber(0), 'G').appendField(',')
    .appendField(new Blockly.FieldNumber(0), 'B').appendField('))')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_flip'] = { init() {
  this.appendDummyInput().appendField('pygame.display.flip()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_clock'] = { init() {
  this.appendDummyInput().appendField('pygame.time.Clock()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pg_tick'] = { init() {
  this.appendDummyInput().appendField('clock.tick(')
    .appendField(new Blockly.FieldNumber(60), 'FPS').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_draw_rect'] = { init() {
  this.appendDummyInput().appendField('pygame.draw.rect(screen, (')
    .appendField(new Blockly.FieldNumber(255), 'R').appendField(',')
    .appendField(new Blockly.FieldNumber(0), 'G').appendField(',')
    .appendField(new Blockly.FieldNumber(0), 'B').appendField('), (')
    .appendField(new Blockly.FieldNumber(100), 'X').appendField(',')
    .appendField(new Blockly.FieldNumber(100), 'Y').appendField(',')
    .appendField(new Blockly.FieldNumber(50), 'W').appendField(',')
    .appendField(new Blockly.FieldNumber(50), 'H').appendField('))')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_event_loop'] = { init() {
  this.appendDummyInput().appendField('for event in pygame.event.get():')
  this.appendStatementInput('BODY').setCheck(null)
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['pg_quit_check'] = { init() {
  this.appendDummyInput().appendField('if event.type == pygame.QUIT: pygame.quit()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['pg_init']        = () => 'pygame.init()\n'
pythonGenerator.forBlock['pg_display']     = (b,g) => [`pygame.display.set_mode((${b.getFieldValue('W')}, ${b.getFieldValue('H')}))`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['pg_set_caption'] = b => `pygame.display.set_caption('${b.getFieldValue('TITLE')}')\n`
pythonGenerator.forBlock['pg_fill']        = b => `screen.fill((${b.getFieldValue('R')}, ${b.getFieldValue('G')}, ${b.getFieldValue('B')}))\n`
pythonGenerator.forBlock['pg_flip']        = () => 'pygame.display.flip()\n'
pythonGenerator.forBlock['pg_clock']       = (_,g) => ['pygame.time.Clock()', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['pg_tick']        = b => `clock.tick(${b.getFieldValue('FPS')})\n`
pythonGenerator.forBlock['pg_draw_rect']   = b => `pygame.draw.rect(screen, (${b.getFieldValue('R')}, ${b.getFieldValue('G')}, ${b.getFieldValue('B')}), (${b.getFieldValue('X')}, ${b.getFieldValue('Y')}, ${b.getFieldValue('W')}, ${b.getFieldValue('H')}))\n`
pythonGenerator.forBlock['pg_event_loop']  = (b,g) => `for event in pygame.event.get():\n${g.statementToCode(b,'BODY')||'    pass\n'}`
pythonGenerator.forBlock['pg_quit_check']  = () => 'if event.type == pygame.QUIT:\n    pygame.quit()\n'


// ── requests ─────────────────────────────────────────────────────────────────
Blockly.Blocks['req_get'] = { init() {
  this.appendValueInput('URL').setCheck('String').appendField('requests.get(')
  this.appendDummyInput().appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['req_post'] = { init() {
  this.appendValueInput('URL').setCheck('String').appendField('requests.post(')
  this.appendDummyInput().appendField(', json=').appendField(new Blockly.FieldTextInput('{}'), 'DATA').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['req_response_text'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('response'), 'VAR').appendField('.text')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}
Blockly.Blocks['req_response_json'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('response'), 'VAR').appendField('.json()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['req_status_code'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('response'), 'VAR').appendField('.status_code')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}

pythonGenerator.forBlock['req_get']           = (b,g) => [`requests.get(${g.valueToCode(b,'URL',g.ORDER_NONE)||"''"})`  , 0]
pythonGenerator.forBlock['req_post']          = (b,g) => [`requests.post(${g.valueToCode(b,'URL',g.ORDER_NONE)||"''"}, json=${b.getFieldValue('DATA')})`, 0]
pythonGenerator.forBlock['req_response_text'] = b => [`${b.getFieldValue('VAR')}.text`, 0]
pythonGenerator.forBlock['req_response_json'] = b => [`${b.getFieldValue('VAR')}.json()`, 0]
pythonGenerator.forBlock['req_status_code']   = b => [`${b.getFieldValue('VAR')}.status_code`, 0]

// ── numpy ─────────────────────────────────────────────────────────────────────
Blockly.Blocks['np_array'] = { init() {
  this.appendDummyInput().appendField('np.array(').appendField(new Blockly.FieldTextInput('[1,2,3]'), 'DATA').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_zeros'] = { init() {
  this.appendDummyInput().appendField('np.zeros((')
    .appendField(new Blockly.FieldNumber(3), 'R').appendField(',')
    .appendField(new Blockly.FieldNumber(3), 'C').appendField('))')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_ones'] = { init() {
  this.appendDummyInput().appendField('np.ones((')
    .appendField(new Blockly.FieldNumber(3), 'R').appendField(',')
    .appendField(new Blockly.FieldNumber(3), 'C').appendField('))')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_arange'] = { init() {
  this.appendDummyInput().appendField('np.arange(')
    .appendField(new Blockly.FieldNumber(0), 'START').appendField(',')
    .appendField(new Blockly.FieldNumber(10), 'STOP').appendField(',')
    .appendField(new Blockly.FieldNumber(1), 'STEP').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_linspace'] = { init() {
  this.appendDummyInput().appendField('np.linspace(')
    .appendField(new Blockly.FieldNumber(0), 'START').appendField(',')
    .appendField(new Blockly.FieldNumber(1), 'STOP').appendField(',')
    .appendField(new Blockly.FieldNumber(50), 'NUM').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_shape'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('arr'), 'VAR').appendField('.shape')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_reshape'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('arr'), 'VAR').appendField('.reshape(')
    .appendField(new Blockly.FieldNumber(3), 'R').appendField(',')
    .appendField(new Blockly.FieldNumber(3), 'C').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_dot'] = { init() {
  this.appendDummyInput().appendField('np.dot(')
    .appendField(new Blockly.FieldTextInput('a'), 'A').appendField(',')
    .appendField(new Blockly.FieldTextInput('b'), 'B').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['np_mean'] = { init() {
  this.appendDummyInput().appendField('np.mean(').appendField(new Blockly.FieldTextInput('arr'), 'VAR').appendField(')')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}
Blockly.Blocks['np_sum'] = { init() {
  this.appendDummyInput().appendField('np.sum(').appendField(new Blockly.FieldTextInput('arr'), 'VAR').appendField(')')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}

pythonGenerator.forBlock['np_array']   = b => [`np.array(${b.getFieldValue('DATA')})`, 0]
pythonGenerator.forBlock['np_zeros']   = b => [`np.zeros((${b.getFieldValue('R')}, ${b.getFieldValue('C')}))`, 0]
pythonGenerator.forBlock['np_ones']    = b => [`np.ones((${b.getFieldValue('R')}, ${b.getFieldValue('C')}))`, 0]
pythonGenerator.forBlock['np_arange']  = b => [`np.arange(${b.getFieldValue('START')}, ${b.getFieldValue('STOP')}, ${b.getFieldValue('STEP')})`, 0]
pythonGenerator.forBlock['np_linspace']= b => [`np.linspace(${b.getFieldValue('START')}, ${b.getFieldValue('STOP')}, ${b.getFieldValue('NUM')})`, 0]
pythonGenerator.forBlock['np_shape']   = b => [`${b.getFieldValue('VAR')}.shape`, 0]
pythonGenerator.forBlock['np_reshape'] = b => [`${b.getFieldValue('VAR')}.reshape(${b.getFieldValue('R')}, ${b.getFieldValue('C')})`, 0]
pythonGenerator.forBlock['np_dot']     = b => [`np.dot(${b.getFieldValue('A')}, ${b.getFieldValue('B')})`, 0]
pythonGenerator.forBlock['np_mean']    = b => [`np.mean(${b.getFieldValue('VAR')})`, 0]
pythonGenerator.forBlock['np_sum']     = b => [`np.sum(${b.getFieldValue('VAR')})`, 0]

// ── pandas ────────────────────────────────────────────────────────────────────
Blockly.Blocks['pd_read_csv'] = { init() {
  this.appendDummyInput().appendField('pd.read_csv(').appendField(new Blockly.FieldTextInput('data.csv'), 'PATH').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pd_dataframe'] = { init() {
  this.appendDummyInput().appendField('pd.DataFrame(').appendField(new Blockly.FieldTextInput('data'), 'DATA').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pd_head'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('df'), 'VAR').appendField('.head(')
    .appendField(new Blockly.FieldNumber(5), 'N').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pd_describe'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('df'), 'VAR').appendField('.describe()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pd_dropna'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('df'), 'VAR').appendField('.dropna()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pd_groupby'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('df'), 'VAR').appendField('.groupby(')
    .appendField(new Blockly.FieldTextInput('col'), 'COL').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['pd_to_csv'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('df'), 'VAR').appendField('.to_csv(')
    .appendField(new Blockly.FieldTextInput('out.csv'), 'PATH').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['pd_read_csv']  = b => [`pd.read_csv('${b.getFieldValue('PATH')}')`, 0]
pythonGenerator.forBlock['pd_dataframe'] = b => [`pd.DataFrame(${b.getFieldValue('DATA')})`, 0]
pythonGenerator.forBlock['pd_head']      = b => [`${b.getFieldValue('VAR')}.head(${b.getFieldValue('N')})`, 0]
pythonGenerator.forBlock['pd_describe']  = b => [`${b.getFieldValue('VAR')}.describe()`, 0]
pythonGenerator.forBlock['pd_dropna']    = b => [`${b.getFieldValue('VAR')}.dropna()`, 0]
pythonGenerator.forBlock['pd_groupby']   = b => [`${b.getFieldValue('VAR')}.groupby('${b.getFieldValue('COL')}')`, 0]
pythonGenerator.forBlock['pd_to_csv']    = b => `${b.getFieldValue('VAR')}.to_csv('${b.getFieldValue('PATH')}')\n`


// ── matplotlib ────────────────────────────────────────────────────────────────
Blockly.Blocks['plt_plot'] = { init() {
  this.appendDummyInput().appendField('plt.plot(').appendField(new Blockly.FieldTextInput('x'), 'X').appendField(',').appendField(new Blockly.FieldTextInput('y'), 'Y').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_show'] = { init() {
  this.appendDummyInput().appendField('plt.show()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_title'] = { init() {
  this.appendDummyInput().appendField('plt.title(').appendField(new Blockly.FieldTextInput('My Chart'), 'TITLE').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_xlabel'] = { init() {
  this.appendDummyInput().appendField('plt.xlabel(').appendField(new Blockly.FieldTextInput('X Axis'), 'LABEL').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_ylabel'] = { init() {
  this.appendDummyInput().appendField('plt.ylabel(').appendField(new Blockly.FieldTextInput('Y Axis'), 'LABEL').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_bar'] = { init() {
  this.appendDummyInput().appendField('plt.bar(').appendField(new Blockly.FieldTextInput('x'), 'X').appendField(',').appendField(new Blockly.FieldTextInput('y'), 'Y').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_scatter'] = { init() {
  this.appendDummyInput().appendField('plt.scatter(').appendField(new Blockly.FieldTextInput('x'), 'X').appendField(',').appendField(new Blockly.FieldTextInput('y'), 'Y').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['plt_savefig'] = { init() {
  this.appendDummyInput().appendField('plt.savefig(').appendField(new Blockly.FieldTextInput('chart.png'), 'PATH').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['plt_plot']    = b => `plt.plot(${b.getFieldValue('X')}, ${b.getFieldValue('Y')})\n`
pythonGenerator.forBlock['plt_show']    = () => 'plt.show()\n'
pythonGenerator.forBlock['plt_title']   = b => `plt.title('${b.getFieldValue('TITLE')}')\n`
pythonGenerator.forBlock['plt_xlabel']  = b => `plt.xlabel('${b.getFieldValue('LABEL')}')\n`
pythonGenerator.forBlock['plt_ylabel']  = b => `plt.ylabel('${b.getFieldValue('LABEL')}')\n`
pythonGenerator.forBlock['plt_bar']     = b => `plt.bar(${b.getFieldValue('X')}, ${b.getFieldValue('Y')})\n`
pythonGenerator.forBlock['plt_scatter'] = b => `plt.scatter(${b.getFieldValue('X')}, ${b.getFieldValue('Y')})\n`
pythonGenerator.forBlock['plt_savefig'] = b => `plt.savefig('${b.getFieldValue('PATH')}')\n`


// ── tkinter ───────────────────────────────────────────────────────────────────
Blockly.Blocks['tk_window'] = { init() {
  this.appendDummyInput().appendField('tk.Tk()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['tk_title'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('root'), 'VAR').appendField('.title(').appendField(new Blockly.FieldTextInput('My App'), 'TITLE').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['tk_mainloop'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('root'), 'VAR').appendField('.mainloop()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['tk_label'] = { init() {
  this.appendDummyInput().appendField('tk.Label(').appendField(new Blockly.FieldTextInput('root'), 'PARENT').appendField(', text=').appendField(new Blockly.FieldTextInput('Hello'), 'TEXT').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['tk_button'] = { init() {
  this.appendDummyInput().appendField('tk.Button(').appendField(new Blockly.FieldTextInput('root'), 'PARENT').appendField(', text=').appendField(new Blockly.FieldTextInput('Click me'), 'TEXT').appendField(', command=').appendField(new Blockly.FieldTextInput('my_func'), 'CMD').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['tk_entry'] = { init() {
  this.appendDummyInput().appendField('tk.Entry(').appendField(new Blockly.FieldTextInput('root'), 'PARENT').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['tk_pack'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('widget'), 'VAR').appendField('.pack()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['tk_messagebox'] = { init() {
  this.appendDummyInput().appendField('messagebox.showinfo(').appendField(new Blockly.FieldTextInput('Title'), 'TITLE').appendField(',').appendField(new Blockly.FieldTextInput('Message'), 'MSG').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['tk_window']     = (_,g) => ['tk.Tk()', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['tk_title']      = b => `${b.getFieldValue('VAR')}.title('${b.getFieldValue('TITLE')}')\n`
pythonGenerator.forBlock['tk_mainloop']   = b => `${b.getFieldValue('VAR')}.mainloop()\n`
pythonGenerator.forBlock['tk_label']      = (b,g) => [`tk.Label(${b.getFieldValue('PARENT')}, text='${b.getFieldValue('TEXT')}')`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['tk_button']     = (b,g) => [`tk.Button(${b.getFieldValue('PARENT')}, text='${b.getFieldValue('TEXT')}', command=${b.getFieldValue('CMD')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['tk_entry']      = (b,g) => [`tk.Entry(${b.getFieldValue('PARENT')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['tk_pack']       = b => `${b.getFieldValue('VAR')}.pack()\n`
pythonGenerator.forBlock['tk_messagebox'] = b => `messagebox.showinfo('${b.getFieldValue('TITLE')}', '${b.getFieldValue('MSG')}')\n`


// ── flask ─────────────────────────────────────────────────────────────────────
Blockly.Blocks['flask_app'] = { init() {
  this.appendDummyInput().appendField('app = Flask(__name__)')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['flask_route'] = { init() {
  this.appendDummyInput().appendField('@app.route(').appendField(new Blockly.FieldTextInput('/'), 'PATH').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['flask_run'] = { init() {
  this.appendDummyInput().appendField('app.run(debug=').appendField(new Blockly.FieldDropdown([['True','True'],['False','False']]), 'DEBUG').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['flask_jsonify'] = { init() {
  this.appendDummyInput().appendField('jsonify(').appendField(new Blockly.FieldTextInput('data'), 'DATA').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['flask_render'] = { init() {
  this.appendDummyInput().appendField('render_template(').appendField(new Blockly.FieldTextInput('index.html'), 'TMPL').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}

pythonGenerator.forBlock['flask_app']    = () => 'app = Flask(__name__)\n'
pythonGenerator.forBlock['flask_route']  = b => `@app.route('${b.getFieldValue('PATH')}')\n`
pythonGenerator.forBlock['flask_run']    = b => `app.run(debug=${b.getFieldValue('DEBUG')})\n`
pythonGenerator.forBlock['flask_jsonify']= (b,g) => [`jsonify(${b.getFieldValue('DATA')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['flask_render'] = (b,g) => [`render_template('${b.getFieldValue('TMPL')}')`, g.ORDER_FUNCTION_CALL]

// ── os ────────────────────────────────────────────────────────────────────────
Blockly.Blocks['os_getcwd'] = { init() {
  this.appendDummyInput().appendField('os.getcwd()')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}
Blockly.Blocks['os_listdir'] = { init() {
  this.appendDummyInput().appendField('os.listdir(').appendField(new Blockly.FieldTextInput('.'), 'PATH').appendField(')')
  this.setOutput(true, 'Array'); this.setColour(LIB)
}}
Blockly.Blocks['os_path_join'] = { init() {
  this.appendDummyInput().appendField('os.path.join(').appendField(new Blockly.FieldTextInput('dir'), 'A').appendField(',').appendField(new Blockly.FieldTextInput('file'), 'B').appendField(')')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}
Blockly.Blocks['os_path_exists'] = { init() {
  this.appendDummyInput().appendField('os.path.exists(').appendField(new Blockly.FieldTextInput('path'), 'PATH').appendField(')')
  this.setOutput(true, 'Boolean'); this.setColour(LIB)
}}
Blockly.Blocks['os_makedirs'] = { init() {
  this.appendDummyInput().appendField('os.makedirs(').appendField(new Blockly.FieldTextInput('mydir'), 'PATH').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['os_environ'] = { init() {
  this.appendDummyInput().appendField('os.environ.get(').appendField(new Blockly.FieldTextInput('MY_VAR'), 'VAR').appendField(')')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}

pythonGenerator.forBlock['os_getcwd']      = (_,g) => ['os.getcwd()', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['os_listdir']     = (b,g) => [`os.listdir('${b.getFieldValue('PATH')}')`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['os_path_join']   = (b,g) => [`os.path.join('${b.getFieldValue('A')}', '${b.getFieldValue('B')}')`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['os_path_exists'] = (b,g) => [`os.path.exists('${b.getFieldValue('PATH')}')`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['os_makedirs']    = b => `os.makedirs('${b.getFieldValue('PATH')}')\n`
pythonGenerator.forBlock['os_environ']     = (b,g) => [`os.environ.get('${b.getFieldValue('VAR')}')`, g.ORDER_FUNCTION_CALL]

// ── sys ───────────────────────────────────────────────────────────────────────
Blockly.Blocks['sys_argv'] = { init() {
  this.appendDummyInput().appendField('sys.argv')
  this.setOutput(true, 'Array'); this.setColour(LIB)
}}
Blockly.Blocks['sys_exit'] = { init() {
  this.appendDummyInput().appendField('sys.exit(').appendField(new Blockly.FieldNumber(0), 'CODE').appendField(')')
  this.setPreviousStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['sys_path_append'] = { init() {
  this.appendDummyInput().appendField('sys.path.append(').appendField(new Blockly.FieldTextInput('/my/path'), 'PATH').appendField(')')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['sys_argv']        = (_,g) => ['sys.argv', g.ORDER_ATOMIC]
pythonGenerator.forBlock['sys_exit']        = b => `sys.exit(${b.getFieldValue('CODE')})\n`
pythonGenerator.forBlock['sys_path_append'] = b => `sys.path.append('${b.getFieldValue('PATH')}')\n`

// ── math ──────────────────────────────────────────────────────────────────────
Blockly.Blocks['math_sqrt'] = { init() {
  this.appendDummyInput().appendField('math.sqrt(').appendField(new Blockly.FieldNumber(16), 'VAL').appendField(')')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}
Blockly.Blocks['math_floor'] = { init() {
  this.appendDummyInput().appendField('math.floor(').appendField(new Blockly.FieldNumber(3.7), 'VAL').appendField(')')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}
Blockly.Blocks['math_ceil'] = { init() {
  this.appendDummyInput().appendField('math.ceil(').appendField(new Blockly.FieldNumber(3.2), 'VAL').appendField(')')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}
Blockly.Blocks['math_pi'] = { init() {
  this.appendDummyInput().appendField('math.pi')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}
Blockly.Blocks['math_pow'] = { init() {
  this.appendDummyInput().appendField('math.pow(').appendField(new Blockly.FieldNumber(2), 'BASE').appendField(',').appendField(new Blockly.FieldNumber(10), 'EXP').appendField(')')
  this.setOutput(true, 'Number'); this.setColour(LIB)
}}

pythonGenerator.forBlock['math_sqrt']  = (b,g) => [`math.sqrt(${b.getFieldValue('VAL')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['math_floor'] = (b,g) => [`math.floor(${b.getFieldValue('VAL')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['math_ceil']  = (b,g) => [`math.ceil(${b.getFieldValue('VAL')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['math_pi']    = (_,g) => ['math.pi', g.ORDER_ATOMIC]
pythonGenerator.forBlock['math_pow']   = (b,g) => [`math.pow(${b.getFieldValue('BASE')}, ${b.getFieldValue('EXP')})`, g.ORDER_FUNCTION_CALL]

// ── json ──────────────────────────────────────────────────────────────────────
Blockly.Blocks['json_loads'] = { init() {
  this.appendValueInput('TEXT').setCheck('String').appendField('json.loads(')
  this.appendDummyInput().appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['json_dumps'] = { init() {
  this.appendDummyInput().appendField('json.dumps(').appendField(new Blockly.FieldTextInput('data'), 'DATA').appendField(')')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}
Blockly.Blocks['json_load_file'] = { init() {
  this.appendDummyInput().appendField('json.load(').appendField(new Blockly.FieldTextInput('f'), 'FILE').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}

pythonGenerator.forBlock['json_loads']     = (b,g) => [`json.loads(${g.valueToCode(b,'TEXT',g.ORDER_NONE)||"''"})`, 0]
pythonGenerator.forBlock['json_dumps']     = b => [`json.dumps(${b.getFieldValue('DATA')})`, 0]
pythonGenerator.forBlock['json_load_file'] = b => [`json.load(${b.getFieldValue('FILE')})`, 0]

// ── re (regex) ────────────────────────────────────────────────────────────────
Blockly.Blocks['re_match'] = { init() {
  this.appendDummyInput().appendField('re.match(').appendField(new Blockly.FieldTextInput('\\d+'), 'PAT').appendField(',').appendField(new Blockly.FieldTextInput('text'), 'STR').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['re_search'] = { init() {
  this.appendDummyInput().appendField('re.search(').appendField(new Blockly.FieldTextInput('\\d+'), 'PAT').appendField(',').appendField(new Blockly.FieldTextInput('text'), 'STR').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['re_findall'] = { init() {
  this.appendDummyInput().appendField('re.findall(').appendField(new Blockly.FieldTextInput('\\d+'), 'PAT').appendField(',').appendField(new Blockly.FieldTextInput('text'), 'STR').appendField(')')
  this.setOutput(true, 'Array'); this.setColour(LIB)
}}
Blockly.Blocks['re_sub'] = { init() {
  this.appendDummyInput().appendField('re.sub(').appendField(new Blockly.FieldTextInput('\\d+'), 'PAT').appendField(',').appendField(new Blockly.FieldTextInput('X'), 'REPL').appendField(',').appendField(new Blockly.FieldTextInput('text'), 'STR').appendField(')')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}

pythonGenerator.forBlock['re_match']   = b => [`re.match(r'${b.getFieldValue('PAT')}', ${b.getFieldValue('STR')})`, 0]
pythonGenerator.forBlock['re_search']  = b => [`re.search(r'${b.getFieldValue('PAT')}', ${b.getFieldValue('STR')})`, 0]
pythonGenerator.forBlock['re_findall'] = b => [`re.findall(r'${b.getFieldValue('PAT')}', ${b.getFieldValue('STR')})`, 0]
pythonGenerator.forBlock['re_sub']     = b => [`re.sub(r'${b.getFieldValue('PAT')}', '${b.getFieldValue('REPL')}', ${b.getFieldValue('STR')})`, 0]

// ── datetime ──────────────────────────────────────────────────────────────────
Blockly.Blocks['dt_now'] = { init() {
  this.appendDummyInput().appendField('datetime.datetime.now()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['dt_today'] = { init() {
  this.appendDummyInput().appendField('datetime.date.today()')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['dt_strftime'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('dt'), 'VAR').appendField('.strftime(').appendField(new Blockly.FieldTextInput('%Y-%m-%d'), 'FMT').appendField(')')
  this.setOutput(true, 'String'); this.setColour(LIB)
}}

pythonGenerator.forBlock['dt_now']      = (_,g) => ['datetime.datetime.now()', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['dt_today']    = (_,g) => ['datetime.date.today()', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['dt_strftime'] = b => [`${b.getFieldValue('VAR')}.strftime('${b.getFieldValue('FMT')}')`, 0]

// ── threading ─────────────────────────────────────────────────────────────────
Blockly.Blocks['th_thread'] = { init() {
  this.appendDummyInput().appendField('threading.Thread(target=').appendField(new Blockly.FieldTextInput('my_func'), 'FN').appendField(')')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['th_start'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('t'), 'VAR').appendField('.start()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['th_join'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('t'), 'VAR').appendField('.join()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['th_thread'] = (b,g) => [`threading.Thread(target=${b.getFieldValue('FN')})`, g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['th_start']  = b => `${b.getFieldValue('VAR')}.start()\n`
pythonGenerator.forBlock['th_join']   = b => `${b.getFieldValue('VAR')}.join()\n`

// ── socket ────────────────────────────────────────────────────────────────────
Blockly.Blocks['sock_create'] = { init() {
  this.appendDummyInput().appendField('socket.socket(socket.AF_INET, socket.SOCK_STREAM)')
  this.setOutput(true, null); this.setColour(LIB)
}}
Blockly.Blocks['sock_connect'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('s'), 'VAR').appendField('.connect((').appendField(new Blockly.FieldTextInput('localhost'), 'HOST').appendField(',').appendField(new Blockly.FieldNumber(8080), 'PORT').appendField('))')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['sock_send'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('s'), 'VAR').appendField('.send(').appendField(new Blockly.FieldTextInput('msg'), 'MSG').appendField('.encode())')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}
Blockly.Blocks['sock_close'] = { init() {
  this.appendDummyInput().appendField(new Blockly.FieldTextInput('s'), 'VAR').appendField('.close()')
  this.setPreviousStatement(true); this.setNextStatement(true); this.setColour(LIB)
}}

pythonGenerator.forBlock['sock_create']  = (_,g) => ['socket.socket(socket.AF_INET, socket.SOCK_STREAM)', g.ORDER_FUNCTION_CALL]
pythonGenerator.forBlock['sock_connect'] = b => `${b.getFieldValue('VAR')}.connect(('${b.getFieldValue('HOST')}', ${b.getFieldValue('PORT')}))\n`
pythonGenerator.forBlock['sock_send']    = b => `${b.getFieldValue('VAR')}.send(${b.getFieldValue('MSG')}.encode())\n`
pythonGenerator.forBlock['sock_close']   = b => `${b.getFieldValue('VAR')}.close()\n`

// ── EXPORT: map of import name → list of block types ─────────────────────────
export const PY_LIB_BLOCKS = {
  pyautogui:  ['pyag_moveto','pyag_click','pyag_typewrite','pyag_hotkey','pyag_screenshot','pyag_scroll','pyag_alert'],
  pygame:     ['pg_init','pg_display','pg_set_caption','pg_fill','pg_flip','pg_clock','pg_tick','pg_draw_rect','pg_event_loop','pg_quit_check'],
  requests:   ['req_get','req_post','req_response_text','req_response_json','req_status_code'],
  numpy:      ['np_array','np_zeros','np_ones','np_arange','np_linspace','np_shape','np_reshape','np_dot','np_mean','np_sum'],
  'numpy as np': ['np_array','np_zeros','np_ones','np_arange','np_linspace','np_shape','np_reshape','np_dot','np_mean','np_sum'],
  pandas:     ['pd_read_csv','pd_dataframe','pd_head','pd_describe','pd_dropna','pd_groupby','pd_to_csv'],
  'pandas as pd': ['pd_read_csv','pd_dataframe','pd_head','pd_describe','pd_dropna','pd_groupby','pd_to_csv'],
  matplotlib: ['plt_plot','plt_show','plt_title','plt_xlabel','plt_ylabel','plt_bar','plt_scatter','plt_savefig'],
  'matplotlib.pyplot as plt': ['plt_plot','plt_show','plt_title','plt_xlabel','plt_ylabel','plt_bar','plt_scatter','plt_savefig'],
  tkinter:    ['tk_window','tk_title','tk_mainloop','tk_label','tk_button','tk_entry','tk_pack','tk_messagebox'],
  flask:      ['flask_app','flask_route','flask_run','flask_jsonify','flask_render'],
  os:         ['os_getcwd','os_listdir','os_path_join','os_path_exists','os_makedirs','os_environ'],
  sys:        ['sys_argv','sys_exit','sys_path_append'],
  math:       ['math_sqrt','math_floor','math_ceil','math_pi','math_pow'],
  json:       ['json_loads','json_dumps','json_load_file'],
  re:         ['re_match','re_search','re_findall','re_sub'],
  datetime:   ['dt_now','dt_today','dt_strftime'],
  threading:  ['th_thread','th_start','th_join'],
  socket:     ['sock_create','sock_connect','sock_send','sock_close'],
}

export const PY_LIB_LABELS = {
  pyautogui: 'pyautogui', pygame: 'pygame', requests: 'requests',
  numpy: 'numpy', 'numpy as np': 'numpy', pandas: 'pandas', 'pandas as pd': 'pandas',
  matplotlib: 'matplotlib', 'matplotlib.pyplot as plt': 'matplotlib',
  tkinter: 'tkinter', flask: 'flask', os: 'os', sys: 'sys',
  math: 'math', json: 'json', re: 're', datetime: 'datetime',
  threading: 'threading', socket: 'socket',
}
