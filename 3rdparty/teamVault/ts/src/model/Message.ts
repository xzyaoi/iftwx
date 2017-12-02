import {User} from './User';

export class Message {
    from: User;
    content: string;

    constructor(from: User, content: string) {
        this.from = from;
        this.content = content;
    }
}