import type { BinaryOperatorToken } from '../binary-operator';
import type { EofToken } from '../eof';
import type { IdentifierToken } from '../identifier';
import type { InstructionToken } from '../instruction';
import type { MacroToken } from '../macro';
import type { NumericToken } from '../numeric';
import type { PunctuationToken } from '../punctuation';
import type { RegisterToken } from '../register';
import type { StringToken } from '../string';
import type { UnaryOperatorToken } from '../unary-operator';

export type TokenType =
    | 'binary_operator'
    | 'eof'
    | 'identifier'
    | 'instruction'
    | 'macro'
    | 'numeric'
    | 'punctuation'
    | 'register'
    | 'string'
    | 'unary_operator';

export type TokenTypeClass<T extends TokenType> = T extends 'binary_operator'
    ? BinaryOperatorToken
    : T extends 'eof'
      ? EofToken
      : T extends 'identifier'
        ? IdentifierToken
        : T extends 'instruction'
          ? InstructionToken
          : T extends 'macro'
            ? MacroToken
            : T extends 'numeric'
              ? NumericToken
              : T extends 'punctuation'
                ? PunctuationToken
                : T extends 'register'
                  ? RegisterToken
                  : T extends 'string'
                    ? StringToken
                    : T extends 'unary_operator'
                      ? UnaryOperatorToken
                      : never;

export type Token =
    | BinaryOperatorToken
    | EofToken
    | IdentifierToken
    | InstructionToken
    | MacroToken
    | NumericToken
    | PunctuationToken
    | RegisterToken
    | StringToken
    | UnaryOperatorToken;
