export class User {
    
    constructor(public id: string,
        public username: string,
        public email: string,
        public password: string,
        public age: number,
        public status: string,
        public tasks: string[],
        public friends: string[]) { }
}