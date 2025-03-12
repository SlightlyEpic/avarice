export default {
    architecture: 'AVR',
    word_size: '16-bit (some 32-bit)',
    formats: [
        {
            bitPattern: '0000 00rd dddd rrrr',
            instructions: [
                'ADD Rd, Rr',
                'ADC Rd, Rr',
                'SUB Rd, Rr',
                'SBC Rd, Rr',
                'AND Rd, Rr',
                'OR Rd, Rr',
                'EOR Rd, Rr',
                'CPSE Rd, Rr',
            ],
            description:
                'Two-register arithmetic/logic operations. r (source) in bits 9, 4-0; d (destination) in bits 8-5. Opcode bits 15-10: 000000=ADD, 000001=ADC, 000110=SUB, 000010=SBC, 001000=AND, 001010=OR, 001001=EOR, 000100=CPSE.',
        },
        {
            bitPattern: '0101 KKKK dddd KKKK',
            instructions: ['ADIW Rd, K'],
            description:
                'Add immediate to word (R24:R25, R26:R27, R28:R29, R30:R31). K (6-bit constant) in bits 7-6, 3-0; d (00=R24, 01=R26, 10=R28, 11=R30) in bits 5-4.',
        },
        {
            bitPattern: '0111 KKKK dddd KKKK',
            instructions: ['SUBI Rd, K', 'SBCI Rd, K'],
            description:
                'Subtract immediate from R16-R31. K (8-bit constant) in bits 11-8, 3-0; d (0-15 maps to R16-R31) in bits 7-4. Bit 12: 0=SUBI, 1=SBCI.',
        },
        {
            bitPattern: '1001 0110 KKdd KKKK',
            instructions: ['SBIW Rd, K'],
            description:
                'Subtract immediate from word (R24:R25, R26:R27, R28:R29, R30:R31). K (6-bit constant) in bits 7-6, 3-0; d (00=R24, 01=R26, 10=R28, 11=R30) in bits 5-4.',
        },
        {
            bitPattern: '1110 KKKK dddd KKKK',
            instructions: ['LDI Rd, K'],
            description:
                'Load immediate into R16-R31. K (8-bit constant) in bits 11-8, 3-0; d (0-15 maps to R16-R31) in bits 7-4.',
        },
        {
            bitPattern: '1001 010d dddd 0sss',
            instructions: ['COM Rd', 'NEG Rd', 'SWAP Rd', 'INC Rd', 'ASR Rd', 'LSR Rd', 'ROR Rd'],
            description:
                'Single-register bit/arithmetic operations. d (R0-R31) in bits 8-4; sss in bits 2-0: 000=COM, 001=NEG, 010=SWAP, 011=INC, 101=ASR, 110=LSR, 111=ROR.',
        },
        {
            bitPattern: '1001 0100 0sss 1000',
            instructions: [
                'SEC',
                'SEZ',
                'SEN',
                'SEV',
                'SES',
                'SEH',
                'SET',
                'SEI',
                'CLC',
                'CLZ',
                'CLN',
                'CLV',
                'CLS',
                'CLH',
                'CLT',
                'CLI',
            ],
            description:
                'Set/clear status flag. sss (flag select) in bits 6-4: 000=C, 001=Z, 010=N, 011=V, 100=S, 101=H, 110=T, 111=I. Bit 7: 0=CLx, 1=SE{x}.',
        },
        {
            bitPattern: '1111 10dd dddd 0bbb',
            instructions: ['BST Rd, b', 'BLD Rd, b'],
            description:
                'Bit store/load to/from T flag. d (R0-R31) in bits 8-4; b (bit 0-7) in bits 2-0. Bit 10: 0=BLD, 1=BST.',
        },
        {
            bitPattern: '1001 10s0 AAAA Abbb',
            instructions: ['SBI A, b', 'CBI A, b'],
            description:
                'Set/clear bit in I/O register. s (1=set, 0=clear) in bit 9; A (I/O addr 0-31) in bits 7-3; b (bit 0-7) in bits 2-0.',
        },
        {
            bitPattern: '1001 010d dddd 00ss',
            instructions: ['INC Rd', 'DEC Rd'],
            description: 'Increment/decrement register. d (R0-R31) in bits 8-4; ss in bits 1-0: 11=INC, 10=DEC.',
        },
        {
            bitPattern: '0001 01rd dddd rrrr',
            instructions: ['CP Rd, Rr'],
            description: 'Compare two registers. r (source) in bits 9, 4-0; d (destination) in bits 8-5.',
        },
        {
            bitPattern: '0011 KKKK dddd KKKK',
            instructions: ['CPI Rd, K'],
            description:
                'Compare R16-R31 with immediate. K (8-bit constant) in bits 11-8, 3-0; d (0-15 maps to R16-R31) in bits 7-4.',
        },
        {
            bitPattern: '1001 11rd dddd rrrr',
            instructions: ['MUL Rd, Rr', 'MULS Rd, Rr', 'MULSU Rd, Rr'],
            description:
                'Multiply operations. r (source) in bits 9, 4-0; d (destination) in bits 8-5. Bits 11-10: 00=MUL, 01=MULS (R16-R31), 10=MULSU (R16-R31).',
        },
        {
            bitPattern: '0000 10ss dddd rrrr',
            instructions: ['FMUL Rd, Rr', 'FMULS Rd, Rr', 'FMULSU Rd, Rr'],
            description:
                'Fractional multiply (R16-R23). ss in bits 6-4: 000=FMUL, 001=FMULS, 010=FMULSU; d in bits 8-5; r in bits 4-0.',
        },
        {
            bitPattern: '0010 11rd dddd rrrr',
            instructions: ['MOV Rd, Rr'],
            description: 'Copy register. r (source) in bits 9, 4-0; d (destination) in bits 8-5.',
        },
        {
            bitPattern: '0000 0001 dddd rrrr',
            instructions: ['MOVW Rd, Rr'],
            description:
                'Move word (register pairs). d (destination pair, e.g., R1:R0) in bits 7-4; r (source pair) in bits 3-0.',
        },
        {
            bitPattern: '1001 000d dddd 00ss',
            instructions: [
                'LD Rd, X',
                'LD Rd, X+',
                'LD Rd, -X',
                'LD Rd, Y',
                'LD Rd, Y+',
                'LD Rd, -Y',
                'LD Rd, Z',
                'LD Rd, Z+',
                'LD Rd, -Z',
                'ST X, Rr',
                'ST X+, Rr',
                'ST -X, Rr',
                'ST Y, Rr',
                'ST Y+, Rr',
                'ST -Y, Rr',
                'ST Z, Rr',
                'ST Z+, Rr',
                'ST -Z, Rr',
            ],
            description:
                'Load/store via X/Y/Z. d (R0-R31) in bits 8-4; ss in bits 1-0: 00=no change, 01=post-inc, 10=pre-dec. X=1001 000d dddd 00ss, Y=1001 001d dddd 00ss, Z=1001 000d dddd 01ss (variant bits in 13-12).',
        },
        {
            bitPattern: '10q0 qq0d dddd 0qqq',
            instructions: ['LDD Rd, Y+q', 'LDD Rd, Z+q', 'STD Y+q, Rr', 'STD Z+q, Rr'],
            description:
                'Load/store with displacement (Y/Z). q (6-bit offset) in bits 13, 11-10, 2-0; d in bits 8-4. Bit 12: 0=Z, 1=Y.',
        },
        {
            bitPattern: '1001 000d dddd 0000 kkkk kkkk kkkk kkkk',
            instructions: ['LDS Rd, k', 'STS k, Rr'],
            description:
                'Direct load/store (32-bit). d in bits 8-4; k (16-bit address) in second word. Bit 11: 0=LDS, 1=STS.',
        },
        {
            bitPattern: '1010 0kkk dddd kkkk',
            instructions: ['LDS Rd, k', 'STS k, Rr'],
            description:
                'Short direct load/store (AVRtiny, addr 0x40-0xBF). k (7-bit) in bits 10-8, 3-0; d in bits 7-4. Bit 11: 0=LDS, 1=STS.',
        },
        {
            bitPattern: '1001 010d dddd 010s',
            instructions: ['LPM', 'LPM Rd, Z', 'LPM Rd, Z+'],
            description:
                'Load program memory via Z. d (R0-R31, R0 default if omitted) in bits 8-4; s (0=no inc, 1=post-inc) in bit 0.',
        },
        {
            bitPattern: '1001 010d dddd 011s',
            instructions: ['ELPM', 'ELPM Rd, Z', 'ELPM Rd, Z+'],
            description:
                'Extended load program memory. d (R0-R31, R0 default if omitted) in bits 8-4; s (0=no inc, 1=post-inc) in bit 0.',
        },
        {
            bitPattern: '1001 0101 1100 1000',
            instructions: ['SPM'],
            description: 'Store to program memory (fixed encoding).',
        },
        {
            bitPattern: '1001 001d dddd 1111',
            instructions: ['PUSH Rd'],
            description: 'Push register onto stack. d (R0-R31) in bits 8-4.',
        },
        {
            bitPattern: '1001 001d dddd 1101',
            instructions: ['POP Rd'],
            description: 'Pop register from stack. d (R0-R31) in bits 8-4.',
        },
        {
            bitPattern: '1011 0AAd dddd AAAA',
            instructions: ['IN Rd, A', 'OUT A, Rr'],
            description:
                'I/O read/write. A (6-bit I/O addr) in bits 10-9, 3-0; d (R0-R31) in bits 8-4. Bit 11: 0=IN, 1=OUT.',
        },
        {
            bitPattern: '1100 kkkk kkkk kkkk',
            instructions: ['RJMP k'],
            description: 'Relative jump. k (12-bit signed offset) in bits 11-0.',
        },
        {
            bitPattern: '1101 kkkk kkkk kkkk',
            instructions: ['RCALL k'],
            description: 'Relative call. k (12-bit signed offset) in bits 11-0.',
        },
        {
            bitPattern: '1111 00kk kkkk ksss',
            instructions: [
                'BRBS s, k',
                'BRBC s, k',
                'BREQ k',
                'BRNE k',
                'BRCS k',
                'BRCC k',
                'BRSH k',
                'BRLO k',
                'BRMI k',
                'BRPL k',
                'BRGE k',
                'BRLT k',
                'BRHS k',
                'BRHC k',
                'BRTS k',
                'BRTC k',
                'BRVS k',
                'BRVC k',
                'BRIE k',
                'BRID k',
            ],
            description:
                'Branch if status bit set/clear. k (7-bit signed offset) in bits 9-3; s (flag) in bits 2-0. Bit 10: 0=BRBC, 1=BRBS. Aliases: BREQ=BRBS 1, BRNE=BRBC 1, etc.',
        },
        {
            bitPattern: '1001 0100 0000 1001',
            instructions: ['IJMP'],
            description: 'Indirect jump via Z register (fixed encoding).',
        },
        {
            bitPattern: '1001 0100 0001 1001',
            instructions: ['ICALL'],
            description: 'Indirect call via Z register (fixed encoding).',
        },
        {
            bitPattern: '1001 010k kkkk 111k kkkk kkkk kkkk kkkk',
            instructions: ['JMP k'],
            description: 'Absolute jump (32-bit). k (22-bit address) in bits 8-5, second word.',
        },
        {
            bitPattern: '1001 010k kkkk 110k kkkk kkkk kkkk kkkk',
            instructions: ['CALL k'],
            description: 'Absolute call (32-bit). k (22-bit address) in bits 8-5, second word.',
        },
        {
            bitPattern: '1001 0101 0000 1000',
            instructions: ['RET', 'RETI'],
            description: 'Return from subroutine/interrupt. Bit 4: 0=RET, 1=RETI.',
        },
        {
            bitPattern: '1001 0100 0000 1000',
            instructions: ['NOP'],
            description: 'No operation (fixed encoding).',
        },
        {
            bitPattern: '1001 0101 1000 1000',
            instructions: ['SLEEP'],
            description: 'Enter sleep mode (fixed encoding).',
        },
        {
            bitPattern: '1001 0101 1010 1000',
            instructions: ['WDR'],
            description: 'Watchdog reset (fixed encoding).',
        },
        {
            bitPattern: '1001 0101 0001 1000',
            instructions: ['BREAK'],
            description: 'Break for debugging (fixed encoding).',
        },
    ],
};
