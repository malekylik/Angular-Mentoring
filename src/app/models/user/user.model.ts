import { Name } from '../name.model';

export interface User {
    id: string;
    name: Name;
    login: string;
    password: string;
    fakeToken: string;
}
