type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
export function isDigit(s: string): s is Digit {
    return s.length === 1 && s[0].charCodeAt(0) >= '0'.charCodeAt(0) && s[0].charCodeAt(0) <= '9'.charCodeAt(0);
}

export function isWhitespaceChar(s: string): boolean {
    return s.length === 1 && [' ', '\t', '\n', '\r'].includes(s[0]);
}
