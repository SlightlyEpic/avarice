import { BaseToken } from './token';

export class StringToken extends BaseToken<string, void> {
    constructor(
        public readonly name: string,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('string', raw.substring(1, raw.length - 1), file, line, start, end, raw);
    }
}
