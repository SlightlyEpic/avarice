import { Token } from './token';

export const RegisterNames = new Set([
    'r0',
    'r1',
    'r2',
    'r3',
    'r4',
    'r5',
    'r6',
    'r7',
    'r8',
    'r9',
    'r10',
    'r11',
    'r12',
    'r13',
    'r14',
    'r15',
    'r16',
    'r17',
    'r18',
    'r19',
    'r20',
    'r21',
    'r22',
    'r23',
    'r24',
    'r25',
    'r26',
    'r27',
    'r28',
    'r29',
    'r30',
    'r31',
]);

export type RegisterName = typeof RegisterNames extends Set<infer T> ? T : never;

export function isRegisterName(s: string): s is RegisterName {
    return RegisterNames.has(s as RegisterName);
}

export type RegisterTokenData = {
    regIndex: number;
};

export class RegisterToken extends Token<RegisterName, RegisterTokenData> {
    constructor(
        public readonly name: string,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
    ) {
        super('register', name, file, line, start, end, raw, {
            regIndex: Number(name.substring(1)),
        });
    }
}
