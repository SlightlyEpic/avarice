import { BaseToken } from './token';

export const OperatorNames = new Set(['+', '-', '*', '/', '<<', '>>', '>>>', '^', '&', '|', '~'] as const);

export type OperatorName = typeof OperatorNames extends Set<infer T> ? T : never;

export function isOperatorName(s: string): s is OperatorName {
    return OperatorNames.has(s as OperatorName);
}

export function isOperatorChar(s: string): boolean {
    if (s.length !== 1) return false;
    if (s === '>' || s === '<') return true;
    return OperatorNames.has(s as OperatorName);
}

export class OperatorToken extends BaseToken<OperatorName, void> {
    constructor(
        public readonly name: OperatorName,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('operator', name, file, line, start, end, raw);
    }
}
