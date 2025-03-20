export class ScannerError {
    constructor(
        readonly code: string,
        readonly file: string,
        readonly line: number,
        readonly lineOffset: number,
        readonly message: string,
    ) {}

    get [Symbol.toStringTag]() {
        return `${this.file}:${this.line}:${this.lineOffset} - error ${this.code}: ${this.message}`;
    }
}
