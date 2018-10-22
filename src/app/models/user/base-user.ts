import { User } from './user.model';

export class BaseUser implements User {
    constructor(    
        public id: string,
        public firstName: string,
        public lastName: string
        ) {}
}
