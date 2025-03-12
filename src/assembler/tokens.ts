export const MacroTokens = new Set([
    'byte',
    'word',
    'db',
    'dw',
    'equ',
    'set',
    'def',
    'org',
    'include',
    'macro',
    'endmacro',
    'if',
    'else',
    'endif',
    'ifdef',
    'cseg',
    'dseg',
    'eseg',
    'list',
    'nolist',
    'listmac',
    'device',
    'message',
    'error',
    'warning',
    'exit',
    'space',
    'ascii',
    'asciz',
    'global',
    'section',
    'align',
] as const);

export type MacroToken = typeof MacroTokens extends Set<infer T> ? T : never;
