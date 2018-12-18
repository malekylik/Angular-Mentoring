import { Action } from "@ngrx/store";

import { Course } from "src/app/modules/course/models/course.model";
import { CoursesReqParams } from "src/app/modules/course/models/courses-req-params";

export enum CoursesActionTypes {
    GetCourses = '[Courses] GetCourses',
    StoreCourses = '[Courses] StoreCourses',
    ResetCourses = '[Courses] ResetCourses',
    DeleteCourses = '[Courses] DeleteCourses',
    AddCourse = '[Courses] AddCourse',
    EditCourse = '[Courses] EditCourse',
    Error = '[Courses] Error',
}

export class GetCourses implements Action {
    readonly type: string = CoursesActionTypes.GetCourses;

    constructor(public payload: CoursesReqParams) {}
}

export class StoreCourses implements Action {
    readonly type: string = CoursesActionTypes.StoreCourses;

    constructor(public payload: Course[]) {}
}

export class ResetCourses implements Action {
    readonly type: string = CoursesActionTypes.ResetCourses;
}

export class DeleteCourses implements Action {
    readonly type: string = CoursesActionTypes.DeleteCourses;

    constructor(public payload: { id: string, coursesReqParams?: CoursesReqParams }) {}
}

export class AddCourse implements Action {
    readonly type: string = CoursesActionTypes.AddCourse;

    constructor(public payload: Course) {}
}

export class EditCourse implements Action {
    readonly type: string = CoursesActionTypes.EditCourse;

    constructor(public payload: Course) {}
}

export class Error implements Action {
    readonly type: string = CoursesActionTypes.Error;

    constructor(public payload) {}
}

export type CoursesActions = GetCourses | StoreCourses | Error;
