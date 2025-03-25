import type { EofToken } from '../eof';
import type { ErrorToken } from '../error';
import type { IdentifierToken } from '../identifier';
import type { InstructionToken } from '../instruction';
import type { MacroToken } from '../macro';
import type { NumericToken } from '../numeric';
import type { OperatorToken } from '../operator';
import type { PunctuationToken } from '../punctuation';
import type { RegisterToken } from '../register';
import type { StringToken } from '../string';

export type TokenType =
    | 'operator'
    | 'eof'
    | 'error'
    | 'identifier'
    | 'instruction'
    | 'macro'
    | 'numeric'
    | 'punctuation'
    | 'register'
    | 'string';

export type TokenTypeClass<T extends TokenType> = T extends 'eof'
    ? EofToken
    : T extends 'error'
      ? ErrorToken
      : T extends 'identifier'
        ? IdentifierToken
        : T extends 'instruction'
          ? InstructionToken
          : T extends 'macro'
            ? MacroToken
            : T extends 'numeric'
              ? NumericToken
              : T extends 'operator'
                ? OperatorToken
                : T extends 'punctuation'
                  ? PunctuationToken
                  : T extends 'register'
                    ? RegisterToken
                    : T extends 'string'
                      ? StringToken
                      : never;

export type Token =
    | OperatorToken
    | EofToken
    | IdentifierToken
    | InstructionToken
    | MacroToken
    | NumericToken
    | PunctuationToken
    | RegisterToken
    | StringToken;
