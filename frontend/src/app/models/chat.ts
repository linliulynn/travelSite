import { Message } from './message';
export class Chat {
    constructor (
    public convId: number,
    public names: string[],
    public messages: Message[]
    ) { }
}
