import { Token } from './token';

export class IdentifierToken extends Token<string, void> {
    constructor(
        public readonly name: string,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('identifier', name, file, line, start, end, raw);
    }
}
