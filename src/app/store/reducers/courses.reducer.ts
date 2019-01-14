import { Course } from 'src/app/modules/course/models/course.model';
import { CoursesActionTypes } from '../actions/courses.actions';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';
import { CoursesReqParams } from 'src/app/modules/course/models/courses-req-params';
import { CoursesDeletePayload } from 'src/app/models/courses-delete-action-payload';

type ActionType = CoursesReqParams | CoursesDeletePayload | Course | Course[];

export function coursesReducer(state: Course[] = [], action: ActionPayload<ActionType>): Course[] {
    switch (action.type) {
        case CoursesActionTypes.StoreCourses: {
            const courses: Course[] = <Course[]>action.payload;
            return courses.length ? [...state, ...<Course[]>action.payload] : state;
        }
        case CoursesActionTypes.ResetCourses: {
            return [];
        }
        default: {
            return state;
        }
    }
}
