import { BaseToken } from './token';

export type PunctuationName = '(' | ')' | ',';

export function isPunctuationChar(c: string): c is PunctuationName {
    return ['(', ')', ','].includes(c);
}

export class PunctuationToken extends BaseToken<PunctuationName, void> {
    constructor(
        public readonly name: PunctuationName,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('punctuation', name, file, line, start, end, raw);
    }
}
