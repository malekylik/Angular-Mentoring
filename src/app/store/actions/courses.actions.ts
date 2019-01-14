import { Course } from 'src/app/modules/course/models/course.model';
import { CoursesReqParams } from 'src/app/modules/course/models/courses-req-params';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';
import { CoursesDeletePayload } from 'src/app/models/courses-delete-action-payload';

export enum CoursesActionTypes {
    GetCourses = '[Courses] GetCourses',
    StoreCourses = '[Courses] StoreCourses',
    ResetCourses = '[Courses] ResetCourses',
    DeleteCourses = '[Courses] DeleteCourses',
    AddCourse = '[Courses] AddCourse',
    EditCourse = '[Courses] EditCourse',
    Error = '[Courses] Error',
}

export class CoursesActions {
    public static getCourses(payload: CoursesReqParams): ActionPayload<CoursesReqParams> {
        return new ActionPayload(CoursesActionTypes.GetCourses, payload);
    }

    public static storeCourses(courses: Course[]): ActionPayload<Course[]> {
        return new ActionPayload(CoursesActionTypes.StoreCourses, courses);
    }

    public static resetCourses(): ActionPayload<void> {
        return new ActionPayload(CoursesActionTypes.ResetCourses);
    }

    public static deleteCourses(payload: CoursesDeletePayload): ActionPayload<CoursesDeletePayload> {
        return new ActionPayload(CoursesActionTypes.DeleteCourses, payload);
    }

    public static addCourse(course: Course): ActionPayload<Course> {
        return new ActionPayload(CoursesActionTypes.AddCourse, course);
    }

    public static editCourse(course: Course): ActionPayload<Course> {
        return new ActionPayload(CoursesActionTypes.EditCourse, course);
    }

    public static error(payload: any): ActionPayload<any> {
        return new ActionPayload(CoursesActionTypes.Error, payload);
    }
}
