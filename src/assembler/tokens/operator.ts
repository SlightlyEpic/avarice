import { BaseToken } from './token';

export type OperatorName = '+' | '-' | '*' | '/' | '<<' | '>>' | '>>>' | '^' | '&' | '|' | '~';

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
