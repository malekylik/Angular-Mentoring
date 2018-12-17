import { Course } from "src/app/modules/course/models/course.model";
import { CoursesActions, CoursesActionTypes, StoreCourses } from "../actions/courses.actions";

export function coursesReducer(state: Course[] = [], action: CoursesActions): Course[] {
    switch (action.type) {
        case CoursesActionTypes.StoreCourses: {
            const courses: Course[] = (<StoreCourses>action).payload;
            return  courses.length ? [...state, ...(<StoreCourses>action).payload] : state;
        }
        default: {
            return state;
        }
    }
}
