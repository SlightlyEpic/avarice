import instructionSet from '@/data/instruction-set';

let instructions = 0;
for (const format of instructionSet.formats) {
    instructions += format.instructions.length;
}
// console.log('total instructions: ', instructions);
