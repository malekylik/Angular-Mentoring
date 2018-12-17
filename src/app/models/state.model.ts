import { User } from './user/user.model';
import { Course } from '../modules/course/models/course.model';

export interface State {
    user: User;
    courses: Course[];
}
