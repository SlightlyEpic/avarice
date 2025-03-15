import { BaseToken } from './token';

export type UnaryOperatorName = '+' | '-' | '*' | '/' | '<<' | '>>' | '>>>' | '^' | '&' | '|';

export class UnaryOperatorToken extends BaseToken<UnaryOperatorName, void> {
    constructor(
        public readonly name: UnaryOperatorName,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('unary_operator', name, file, line, start, end, raw);
    }
}
