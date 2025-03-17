import { BaseToken } from './token';

export class EofToken extends BaseToken<'EOF', void> {
    constructor(
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('eof', 'EOF', file, line, start, end, raw);
    }
}
