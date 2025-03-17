export class ScannerError {
    constructor(
        readonly code: string,
        readonly file: string,
        readonly line: number,
        readonly linePos: number,
        readonly message: string,
    ) {}

    get [Symbol.toStringTag]() {
        return `${this.file}:${this.line}:${this.linePos} - error ${this.code}: ${this.message}`;
    }
}
