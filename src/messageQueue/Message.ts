export default class Message {
    constructor(
        public Provider: string,
        public timestamp: number,
        public type: string
    ) {
    }
}