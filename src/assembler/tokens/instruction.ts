import { BaseToken } from './token';

export const InstructionNames = new Set([
    'adc',
    'add',
    'adiw',
    'and',
    'andi',
    'asr',
    'bclr',
    'bld',
    'brbc',
    'brbs',
    'brcc',
    'brcs',
    'break',
    'breq',
    'brge',
    'brhc',
    'brhs',
    'brid',
    'brie',
    'brlo',
    'brlt',
    'brmi',
    'brne',
    'brpl',
    'brsh',
    'brtc',
    'brts',
    'brvc',
    'brvs',
    'bset',
    'bst',
    'call',
    'cbi',
    'cbr',
    'clc',
    'clh',
    'cli',
    'cln',
    'clr',
    'cls',
    'clt',
    'clv',
    'clz',
    'com',
    'cp',
    'cpc',
    'cpi',
    'cpse',
    'dec',
    'des',
    'eicall',
    'eijmp',
    'elplm',
    'eor',
    'fmul',
    'fmuls',
    'fmulsu',
    'icall',
    'ijmp',
    'in',
    'inc',
    'jmp',
    'lac',
    'las',
    'lat',
    'ld',
    'ldd',
    'ldi',
    'lds',
    'lpm',
    'lsl',
    'lsr',
    'mov',
    'movw',
    'mul',
    'muls',
    'mulsu',
    'neg',
    'nop',
    'or',
    'ori',
    'out',
    'pop',
    'push',
    'rcall',
    'ret',
    'reti',
    'rjmp',
    'rol',
    'ror',
    'sbc',
    'sbci',
    'sbi',
    'sbic',
    'sbis',
    'sbiw',
    'sbr',
    'sbrc',
    'sbrs',
    'sec',
    'seh',
    'sei',
    'sen',
    'ser',
    'ses',
    'set',
    'sev',
    'sez',
    'sleep',
    'spm',
    'st',
    'std',
    'sts',
    'sub',
    'subi',
    'swap',
    'tst',
    'wdr',
    'xch',
] as const);

export type InstructionName = typeof InstructionNames extends Set<infer T> ? T : never;

export function isInstructionName(s: string): s is InstructionName {
    return InstructionNames.has(s as InstructionName);
}

export class InstructionToken extends BaseToken<InstructionName, void> {
    constructor(
        public readonly name: InstructionName,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('instruction', name, file, line, start, end, raw);
    }
}
