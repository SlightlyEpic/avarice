import { EofToken } from '../tokens/eof';
import { ErrorToken } from '../tokens/error';
import { MacroToken, isMacroName } from '../tokens/macro';
import { NumericToken } from '../tokens/numeric';
import { PunctuationToken, isPunctuationChar } from '../tokens/punctuation';
import type { Token } from '../tokens/util/types';
import { ScannerError } from './error';

type FilePosition = {
    line: number;
    lineOffset: number;
    offset: number;
};

export class Scanner {
    private finished = false;
    private tokens: Token[];
    private start: FilePosition;
    private current: FilePosition;

    private panic = false;
    private errors: ScannerError[] = [];

    constructor(
        readonly file: string,
        readonly source: string,
    ) {
        this.start = {
            line: 1,
            lineOffset: 0,
            offset: 0,
        };
        this.current = {
            line: 1,
            lineOffset: 0,
            offset: 0,
        };
        this.tokens = Array.from(this.parseTokens());
    }

    isFinished() {
        return this.finished;
    }

    private addError(code: string, message: string): ErrorToken {
        this.panic = true;
        this.errors.push(new ScannerError(code, this.file, this.start.line, this.start.lineOffset, message));
        return new ErrorToken(this.file, this.start.line, this.start.offset, this.current.offset, 'ERR');
    }

    private peek(): string {
        return this.source[this.current.offset];
    }

    private lookahead(d: number): string {
        return this.current.offset + d < this.source.length ? this.source[this.current.offset + d] : '\0';
    }

    private consume(): string {
        if (this.source[this.current.offset] === '\n') {
            this.current.line++;
            this.current.lineOffset = 0;
        } else {
            this.current.lineOffset++;
        }
        return this.source[this.current.offset++];
    }

    private consumeWord(): string {
        let word = '';
        while (
            this.current.offset < this.source.length &&
            ![' ', '\n', '\t'].includes(this.source[this.current.offset])
        ) {
            word += this.source[this.current.offset++];
        }
        return word;
    }

    private peekWord(): string {
        let word = '';
        let { offset } = this.current;
        while (offset < this.source.length && ![' ', '\n', '\t'].includes(this.source[offset])) {
            word += this.source[offset++];
        }
        return word;
    }

    private position(): FilePosition {
        return { ...this.current };
    }

    // TODO
    private parseNext(): Token | undefined {
        this.start = this.position();

        switch (this.peek().toLowerCase()) {
            case '.':
                return this.macro();
            case '\n':
            case ' ':
                this.consume();
                return;
            case ',':
            case '(':
            case ')':
                return this.punctuation();
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.numeric();
        }
    }

    private *parseTokens(): Generator<Token> {
        while (this.current.offset !== this.source.length) {
            const token = this.parseNext();
            if (token) yield token;
        }

        yield new EofToken(this.file, this.start.line, this.start.offset, this.start.offset, 'EOF');
    }

    // Parse specific tokens

    private macro(): MacroToken | ErrorToken {
        const rawName = this.consumeWord();
        const name = rawName.toLowerCase();

        if (!isMacroName(name)) return this.addError('PARSE001', `Unknown macro .${rawName}`);
        return new MacroToken(name, this.file, this.start.line, this.start.offset, this.current.offset, rawName);
    }

    private punctuation(): PunctuationToken | ErrorToken {
        const raw = this.consume();

        if (!isPunctuationChar(raw)) return this.addError('PARSE002', `Unknown punctuation ${raw}`);
        return new PunctuationToken(raw, this.file, this.start.line, this.start.offset, this.current.offset, raw);
    }

    private numeric(): NumericToken | ErrorToken {
        const raw = this.consumeWord();
        try {
            return new NumericToken('num', this.file, this.start.line, this.start.offset, this.current.offset, raw);
        } catch (_err: unknown) {
            return this.addError('PARSE003', `Invalid numeric literal ${raw}`);
        }
    }
}
