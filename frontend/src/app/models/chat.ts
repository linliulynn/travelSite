import { Message } from './message';
export class Chat {
    constructor (
    public id: number,
    public names: string[],
    public messages: Message[]
    ) { }
}
