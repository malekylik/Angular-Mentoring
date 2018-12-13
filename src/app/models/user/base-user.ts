import hash from 'object-hash';

import { User } from './user.model';
import { Name } from '../name.model';

export class BaseUser implements User {
    name: Name;

    constructor(
        public id: string,
        firstName: string,
        lastName: string,
        public login: string,
        public password: string,
        public fakeToken: string,
    ) {
        this.name = {
            first: firstName,
            last: lastName,
        };
     }

    static generateUser(firstName: string, lastName: string, login: string, password: string, fakeToken: string): BaseUser {
        const courseForHash: Partial<User> = {
            name: {
                first: firstName,
                last: lastName,
            }
        };

        return new BaseUser(hash(courseForHash), firstName, lastName, login, password, fakeToken);
    }
}
