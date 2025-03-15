import { BaseToken } from './token';

export const MacroNames = new Set([
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

export type MacroName = typeof MacroNames extends Set<infer T> ? T : never;

export function isMacroName(s: string): s is MacroName {
    return MacroNames.has(s as MacroName);
}

export class MacroToken extends BaseToken<MacroName, void> {
    constructor(
        public readonly name: MacroName,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('macro', name, file, line, start, end, raw);
    }
}
