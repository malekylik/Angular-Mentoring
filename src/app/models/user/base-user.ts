import hash from 'object-hash';

import { User } from './user.model';

export class BaseUser implements User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public login: string,
        public password: string,
    ) { }

    static generateUser(firstName: string, lastName: string, login: string, password: string): BaseUser {
        const courseForHash: Partial<User> = {
            firstName,
            lastName,
        };

        return new BaseUser(hash(courseForHash), firstName, lastName, login, password);
    }
}
