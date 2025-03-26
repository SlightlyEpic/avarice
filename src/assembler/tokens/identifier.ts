import { isDigit } from '../util/string';
import { BaseToken } from './token';

const identifierCharset = new Set([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '_',
]);

export class IdentifierToken extends BaseToken<string, void> {
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

    static IsValidIdentifier(s: string): boolean {
        if (s.length === 0) return false;
        if (isDigit(s[0])) return false;
        for (let i = 0; i < s.length; i++) {
            if (!identifierCharset.has(s[i])) return false;
        }
        return true;
    }
}
