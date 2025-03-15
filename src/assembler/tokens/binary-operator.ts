import { BaseToken } from './token';

export type BinaryOperatorName = '+' | '-' | '*' | '/' | '<<' | '>>' | '>>>' | '^' | '&' | '|';

export class BinaryOperatorToken extends BaseToken<BinaryOperatorName, void> {
    constructor(
        public readonly name: BinaryOperatorName,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('binary_operator', name, file, line, start, end, raw);
    }
}
