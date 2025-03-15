import { BaseToken } from './token';

export type NumericTokenData = {
    value: number;
    meta: {
        rawLiteralType: 'binary' | 'decimal' | 'hex';
    };
};

export class NumericToken extends BaseToken<string, NumericTokenData> {
    constructor(
        public readonly name: string,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('numeric', name, file, line, start, end, raw, NumericToken.ParseRaw(raw));
    }

    static ParseRaw(raw: string): NumericTokenData {
        let value: number | undefined;
        let type: NumericTokenData['meta']['rawLiteralType'] = 'hex';
        if (raw.startsWith('0x')) {
            value = Number.parseInt(raw.substring(2), 16);
            type = 'hex';
        } else if (raw.startsWith('0b')) {
            value = Number.parseInt(raw.substring(2), 2);
            type = 'binary';
        } else {
            value = Number.parseInt(raw, 10);
            type = 'decimal';
        }

        if (Number.isNaN(value)) throw Error(`Invalid numeric literal: ${raw}`);

        return {
            value,
            meta: {
                rawLiteralType: type,
            },
        };
    }
}
