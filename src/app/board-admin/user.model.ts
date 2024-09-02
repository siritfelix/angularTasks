export class User {
    constructor(
        public id: number,
        public email: string,
        public role: string,
        public firstName: string,
        public lastName?: string,
    ) { }

}