import { BaseToken } from './token';

// Special token added when parser runs into an error
// So that parsing can continue in panic mode to discover more errors
export class ErrorToken extends BaseToken<'parse', void> {
    constructor(
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('error', 'parse', file, line, start, end, raw);
    }
}
