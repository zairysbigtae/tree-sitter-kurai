/**
 * @file Just code in this easy ahh language named Kurai
 * @author Zairy Putra <zairysbigtae@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "kurai",

  rules: {
    // TODO: add the actual grammar rules
    source_file: ($) => repeat($.statement),

    statement: ($) =>
      choice(
        // seq($.print_statement, ";"),
        $.let_statement,
        $.function_decl,
        $.for_loop,
        $.while_loop,
        $.function_call,
        $.import,
      ),

    let_statement: ($) =>
      seq(
        field("let_kw", alias("let", $.keyword)),
        $.identifier,
        "=",
        $.expression,
        ";",
      ),

    for_loop: ($) =>
      seq(
        field("for_kw", alias("for", $.keyword)),
        field("variable", $.identifier),
        field("in_kw", alias("in", $.keyword)),
        field("range", $.range_expr),
      ),
    while_loop: ($) =>
      seq(field("while_kw", alias("while", $.keyword)), $.expression, $.block),

    range_expr: ($) =>
      prec.left(seq(field("start", $.number), "..", field("end", $.number))),

    import: ($) => seq("use", $.path, ";"),
    path: ($) => seq($.identifier, repeat(seq("::", $.identifier))),
    // print_statement: ($) => seq("printf", $.string),
    function_decl: ($) =>
      seq(
        field("fn_kw", alias("fn", $.keyword)),
        $.identifier,
        "(",
        optional($.expression),
        ")",
        $.block,
      ),
    function_call: ($) =>
      seq($.identifier, "(", optional($.expression), ")", ";"),
    binary_expr: ($) =>
      prec.left(seq($.expression, /[<>=!]=?|==/, $.expression)),

    expression: ($) =>
      choice($.string, $.number, $.boolean, $.identifier, $.binary_expr),
    block: ($) => seq("{", repeat($.statement), "}"),

    number: ($) => /\d+/,
    boolean: ($) => choice("true", "false"),
    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    string: ($) => /"[^"]*"/,
    keyword: (_) => prec(-1, "keyword"),
  },
});
