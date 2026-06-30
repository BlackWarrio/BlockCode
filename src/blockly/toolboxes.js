const COMMON = `
  <category name="Logic" colour="#5C81A6">
    <block type="controls_if"></block>
    <block type="logic_compare"></block>
    <block type="logic_operation"></block>
    <block type="logic_negate"></block>
    <block type="logic_boolean"></block>
  </category>
  <category name="Loops" colour="#5CA65C">
    <block type="controls_repeat_ext"></block>
    <block type="controls_whileUntil"></block>
    <block type="controls_for"></block>
    <block type="controls_forEach"></block>
  </category>
  <category name="Math" colour="#5C68A6">
    <block type="math_number"></block>
    <block type="math_arithmetic"></block>
    <block type="math_single"></block>
    <block type="math_round"></block>
    <block type="math_modulo"></block>
  </category>
  <category name="Text" colour="#5CA68D">
    <block type="text"></block>
    <block type="text_join"></block>
    <block type="text_length"></block>
    <block type="text_print"></block>
  </category>
  <category name="Variables" colour="#A65C81" custom="VARIABLE"></category>
  <category name="Functions" colour="#9A5CA6" custom="PROCEDURE"></category>`

const PYTHON_CAT = `
  <category name="Python" colour="#3572A5">
    <block type="py_print"></block>
    <block type="py_input"></block>
    <block type="py_import"></block>
    <block type="py_from_import"></block>
    <block type="py_function_def"></block>
    <block type="py_class_def"></block>
    <block type="py_return"></block>
    <block type="py_list_create"></block>
    <block type="py_dict_create"></block>
    <block type="py_list_append"></block>
    <block type="py_list_comp"></block>
    <block type="py_try_except"></block>
    <block type="py_with"></block>
    <block type="py_yield"></block>
    <block type="py_raise"></block>
    <block type="py_fstring"></block>
    <block type="py_sleep"></block>
    <block type="py_random_int"></block>
    <block type="py_open_file"></block>
    <block type="py_lambda"></block>
    <block type="py_comment"></block>
  </category>`

const JS_CAT = `
  <category name="JavaScript" colour="#f7df1e">
    <block type="js_console_log"></block>
    <block type="js_console_error"></block>
    <block type="js_var_declare"></block>
    <block type="js_arrow_function"></block>
    <block type="js_function"></block>
    <block type="js_async_fn"></block>
    <block type="js_return"></block>
    <block type="js_class"></block>
    <block type="js_new"></block>
    <block type="js_import"></block>
    <block type="js_export"></block>
    <block type="js_array_create"></block>
    <block type="js_array_map"></block>
    <block type="js_array_filter"></block>
    <block type="js_array_push"></block>
    <block type="js_object_create"></block>
    <block type="js_json_parse"></block>
    <block type="js_json_stringify"></block>
    <block type="js_try_catch"></block>
    <block type="js_throw"></block>
    <block type="js_promise"></block>
    <block type="js_await"></block>
    <block type="js_settimeout"></block>
    <block type="js_setinterval"></block>
    <block type="js_random"></block>
    <block type="js_random_int"></block>
    <block type="js_typeof"></block>
    <block type="js_ternary"></block>
    <block type="js_spread"></block>
    <block type="js_comment"></block>
  </category>`

const TS_CAT = `
  <category name="TypeScript" colour="#3178c6">
    <block type="ts_interface"></block>
    <block type="ts_type_alias"></block>
    <block type="ts_enum"></block>
    <block type="ts_typed_var"></block>
    <block type="ts_as"></block>
  </category>`

const JAVA_CAT = `
  <category name="Java" colour="#b07219">
    <block type="java_sysout"></block>
    <block type="java_syserr"></block>
    <block type="java_var_declare"></block>
    <block type="java_class_def"></block>
    <block type="java_interface"></block>
    <block type="java_method_def"></block>
    <block type="java_return"></block>
    <block type="java_new_object"></block>
    <block type="java_try_catch"></block>
    <block type="java_throw"></block>
    <block type="java_arraylist"></block>
    <block type="java_hashmap"></block>
    <block type="java_for_each"></block>
    <block type="java_scanner"></block>
    <block type="java_import"></block>
    <block type="java_comment"></block>
  </category>`

const C_CAT = `
  <category name="C" colour="#555555">
    <block type="c_main"></block>
    <block type="c_include"></block>
    <block type="c_printf"></block>
    <block type="c_scanf"></block>
    <block type="c_var_declare"></block>
    <block type="c_function"></block>
    <block type="c_return"></block>
    <block type="c_pointer"></block>
    <block type="c_malloc"></block>
    <block type="c_free"></block>
    <block type="c_struct"></block>
    <block type="c_comment"></block>
  </category>`

const CPP_CAT = C_CAT + `
  <category name="C++" colour="#f34b7d">
    <block type="cpp_namespace"></block>
    <block type="cpp_cout"></block>
    <block type="cpp_cin"></block>
    <block type="cpp_class"></block>
    <block type="cpp_constructor"></block>
    <block type="cpp_vector"></block>
    <block type="cpp_template"></block>
  </category>`

const RUBY_CAT = `
  <category name="Ruby" colour="#701516">
    <block type="rb_puts"></block>
    <block type="rb_print"></block>
    <block type="rb_gets"></block>
    <block type="rb_def"></block>
    <block type="rb_class"></block>
    <block type="rb_require"></block>
    <block type="rb_symbol"></block>
    <block type="rb_hash"></block>
    <block type="rb_array"></block>
    <block type="rb_do_block"></block>
    <block type="rb_return"></block>
    <block type="rb_comment"></block>
  </category>`

const GO_CAT = `
  <category name="Go" colour="#00ACD7">
    <block type="go_fmt_println"></block>
    <block type="go_fmt_printf"></block>
    <block type="go_var"></block>
    <block type="go_func"></block>
    <block type="go_struct"></block>
    <block type="go_interface"></block>
    <block type="go_goroutine"></block>
    <block type="go_channel"></block>
    <block type="go_import"></block>
    <block type="go_return"></block>
    <block type="go_comment"></block>
  </category>`

const RUST_CAT = `
  <category name="Rust" colour="#dea584">
    <block type="rs_println"></block>
    <block type="rs_let"></block>
    <block type="rs_fn"></block>
    <block type="rs_struct"></block>
    <block type="rs_enum"></block>
    <block type="rs_impl"></block>
    <block type="rs_match"></block>
    <block type="rs_use"></block>
    <block type="rs_return"></block>
    <block type="rs_vec"></block>
    <block type="rs_option"></block>
    <block type="rs_comment"></block>
  </category>`

const PHP_CAT = `
  <category name="PHP" colour="#4F5D95">
    <block type="php_echo"></block>
    <block type="php_var"></block>
    <block type="php_function"></block>
    <block type="php_class"></block>
    <block type="php_array"></block>
    <block type="php_foreach"></block>
    <block type="php_return"></block>
    <block type="php_require"></block>
    <block type="php_print_r"></block>
    <block type="php_comment"></block>
  </category>`

const MAP = {
  py:   COMMON + PYTHON_CAT,
  js:   COMMON + JS_CAT,
  ts:   COMMON + JS_CAT + TS_CAT,
  java: COMMON + JAVA_CAT,
  c:    COMMON + C_CAT,
  cpp:  COMMON + CPP_CAT,
  cc:   COMMON + CPP_CAT,
  rb:   COMMON + RUBY_CAT,
  go:   COMMON + GO_CAT,
  rs:   COMMON + RUST_CAT,
  php:  COMMON + PHP_CAT,
}

export function getToolboxForExt(ext) {
  const contents = MAP[ext] || COMMON
  return `<xml xmlns="https://developers.google.com/blockly/xml" id="toolbox">${contents}</xml>`
}
