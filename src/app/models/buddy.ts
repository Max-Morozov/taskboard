import { User } from "./user";

export class Buddy {
    constructor(public user: User, public isFriend: boolean) { }
};