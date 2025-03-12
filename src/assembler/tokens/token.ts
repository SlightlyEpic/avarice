export class Token<T extends string, V> {
    data: V;

    constructor(
        public readonly type: string,
        public readonly name: T,
        public readonly file: string,
        public readonly line: number,
        public readonly start: number,
        public readonly end: number,
        public readonly raw: string,
        data: V,
    ) {
        this.data = data;
    }
}
