import { EofToken } from '../tokens/eof';
import { ErrorToken } from '../tokens/error';
import { IdentifierToken } from '../tokens/identifier';
import { InstructionToken, isInstructionName } from '../tokens/instruction';
import { MacroToken, isMacroName } from '../tokens/macro';
import { NumericToken } from '../tokens/numeric';
import { OperatorToken, isOperatorChar, isOperatorName } from '../tokens/operator';
import { PunctuationToken, isPunctuationChar } from '../tokens/punctuation';
import { RegisterToken, isRegisterName } from '../tokens/register';
import { StringToken } from '../tokens/string';
import type { Token } from '../tokens/util/types';
import { isDigit, isWhitespaceChar } from '../util/string';
import { ScannerError } from './error';

type FilePosition = {
    line: number;
    lineOffset: number;
    offset: number;
};

export class Scanner {
    finished = false;
    tokens: Token[];
    private start: FilePosition;
    private current: FilePosition;

    panic = false;
    errors: ScannerError[] = [];

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
        this.tokens = [];
    }

    scan() {
        if (!this.finished) {
            this.tokens = Array.from(this.scanTokens());
            this.finished = true;
        }
    }

    private addError(code: string, message: string): ErrorToken {
        this.panic = true;
        this.errors.push(new ScannerError(code, this.file, this.start.line, this.start.lineOffset, message));
        return new ErrorToken(this.file, this.start.line, this.start.offset, this.current.offset, 'ERR');
    }

    private peek(): string {
        return this.source[this.current.offset];
    }

    private peekWord(): string {
        let word = '';
        let { offset } = this.current;
        while (offset < this.source.length && ![' ', '\n', '\t'].includes(this.source[offset])) {
            word += this.source[offset++];
        }
        return word;
    }

    private lookahead(d: number): string {
        return this.current.offset + d < this.source.length ? this.source[this.current.offset + d] : '\0';
    }

    private consume(): string {
        if (this.current.offset >= this.source.length)
            throw new Error('SCAN000: Unexpected end of file while scanning.');
        if (this.source[this.current.offset] === '\n') {
            this.current.line++;
            this.current.lineOffset = 0;
        } else {
            this.current.lineOffset++;
        }
        return this.source[this.current.offset++];
    }

    private consumeWord(): string {
        if (this.current.offset >= this.source.length)
            throw new Error('SCAN000: Unexpected end of file while scanning.');
        let word = '';
        while (
            this.current.offset < this.source.length &&
            ![' ', '\n', '\t'].includes(this.source[this.current.offset])
        ) {
            word += this.source[this.current.offset++];
        }
        return word;
    }

    private position(): FilePosition {
        return { ...this.current };
    }

    // TODO
    private scanNext(): Token | undefined {
        this.start = this.position();

        const c = this.peek().toLowerCase();

        if (c === '.') return this.macro();
        if (isWhitespaceChar(c)) {
            this.consume();
            return;
        }
        if (isPunctuationChar(c)) return this.punctuation();
        if (isDigit(c)) return this.numeric();
        if (isOperatorChar(c)) return this.operator();
        if (c === '"') return this.string();

        const word = this.peekWord().toLowerCase();
        if (isRegisterName(word)) return this.register();
        if (isInstructionName(word)) return this.instruction();
        return this.identifier();
    }

    private *scanTokens(): Generator<Token> {
        while (this.current.offset !== this.source.length) {
            const token = this.scanNext();
            if (token) yield token;
        }

        yield new EofToken(this.file, this.start.line, this.start.offset, this.start.offset, 'EOF');
    }

    // Scan specific tokens

    private identifier(): IdentifierToken | ErrorToken {
        const word = this.consumeWord();
        if (!IdentifierToken.IsValidIdentifier(word))
            return this.addError('SCAN007', `Invalid identifier name ${word}`);
        return new IdentifierToken(word, this.file, this.start.line, this.start.offset, this.current.offset, word);
    }

    private instruction(): InstructionToken | ErrorToken {
        const word = this.consumeWord();
        if (!isInstructionName(word)) return this.addError('SCAN006', `Invalid instruction name ${word}`);
        return new InstructionToken(word, this.file, this.start.line, this.start.offset, this.current.offset, word);
    }

    private macro(): MacroToken | ErrorToken {
        const rawName = this.consumeWord();
        const name = rawName.toLowerCase();

        if (!isMacroName(name)) return this.addError('SCAN001', `Unknown macro .${rawName}`);
        return new MacroToken(name, this.file, this.start.line, this.start.offset, this.current.offset, rawName);
    }

    private numeric(): NumericToken | ErrorToken {
        const raw = this.consumeWord();
        try {
            return new NumericToken('num', this.file, this.start.line, this.start.offset, this.current.offset, raw);
        } catch (_err: unknown) {
            return this.addError('SCAN003', `Invalid numeric literal ${raw}`);
        }
    }

    private operator(): OperatorToken | ErrorToken {
        let raw = this.consume();
        if (raw !== '>' && raw !== '<') {
            if (isOperatorName(raw))
                return new OperatorToken(raw, this.file, this.start.line, this.start.offset, this.current.offset, raw);
            return this.addError('SCAN004', `Unknown operator ${raw}`);
        }

        raw += this.consume();
        if (raw === '<<') {
            return new OperatorToken(raw, this.file, this.start.line, this.start.offset, this.current.offset, raw);
        }
        if (raw === '>>') {
            if (this.peek() === '>') raw += this.consume();
            return new OperatorToken(
                raw as '>>' | '>>>',
                this.file,
                this.start.line,
                this.start.offset,
                this.current.offset,
                raw,
            );
        }

        return this.addError('SCAN004', `Unknown operator ${raw}`);
    }

    private punctuation(): PunctuationToken | ErrorToken {
        const raw = this.consume();

        if (!isPunctuationChar(raw)) return this.addError('SCAN002', `Unknown punctuation ${raw}`);
        return new PunctuationToken(raw, this.file, this.start.line, this.start.offset, this.current.offset, raw);
    }

    private register(): RegisterToken | ErrorToken {
        const word = this.consumeWord();
        if (!isRegisterName(word)) return this.addError('SCAN005', `Invalid register name ${word}`);
        return new RegisterToken(word, this.file, this.start.line, this.start.offset, this.current.offset, word);
    }

    private string(): StringToken | ErrorToken {
        let raw = this.consume(); // consume opening "
        let escapeNext = false;
        while (escapeNext || this.peek() !== '"') {
            if (escapeNext) {
                const c = this.peek();
                if (c === 'n') raw += '\n';
                else if (c === 't') raw += '\t';
                else if (c === '\\') raw += '\\';
                else raw += c;
                escapeNext = false;
            } else if (this.peek() === '\\') {
                escapeNext = true;
            } else {
                raw += this.consume();
            }
        }
        raw += this.consume(); // consume closing "

        return new StringToken('string', this.file, this.start.line, this.start.offset, this.current.offset, raw);
    }
}
