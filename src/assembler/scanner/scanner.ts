import { EofToken } from '../tokens/eof';
import { MacroToken, isMacroName } from '../tokens/macro';
import type { Token } from '../tokens/util/types';
import type { ScannerError } from './error';

export class Scanner {
    private finished = false;
    private tokens: Token[];
    private line = 1;
    private linePos = 0;
    private start = 0;
    private current = 0;

    private panic = false;
    private errors: ScannerError[] = [];

    constructor(
        readonly file: string,
        readonly source: string,
    ) {
        this.tokens = Array.from(this.parseTokens());
    }

    isFinished() {
        return this.finished;
    }

    private peek(): string {
        return this.source[this.current];
    }

    private consume(): string {
        if (this.source[this.current] === '\n') {
            this.line++;
            this.linePos = 0;
        } else {
            this.linePos++;
        }
        return this.source[this.current++];
    }

    // TODO
    private parseNext(): Token | undefined {
        switch (this.peek()) {
            case '.':
                return this.macro();
            case '\n':
                this.consume();
                return;
            case ' ':
                this.consume();
                return;
        }
    }

    private *parseTokens(): Generator<Token> {
        while (this.current !== this.source.length) {
            const token = this.parseNext();
            if (token) yield token;
        }

        yield new EofToken(this.file, this.line, this.start, this.start, 'EOF');
    }

    // Parse specific tokens

    // TODO
    private macro(): MacroToken {
        this.start = this.current;
        let name = '';
        this.consume(); // Consume .
        while (this.peek() !== ' ' && this.peek() !== '\n') name += this.consume();

        if (!isMacroName(name)) throw Error(`Unknown macro .${name} at ${this.line}:${this.start}`);
        return new MacroToken(name, this.file, this.line, this.start);
    }
}
