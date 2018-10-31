import hash from 'object-hash';

import { User } from './user.model';

export class BaseUser implements User {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string
    ) { }

    static generateUser(firstName: string, lastName: string): BaseUser {
        const courseForHash: Partial<User> = {
            firstName,
            lastName,
        };

        return new BaseUser(hash(courseForHash), firstName, lastName);
    }
}
