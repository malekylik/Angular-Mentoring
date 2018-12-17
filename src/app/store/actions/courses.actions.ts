import { Action } from "@ngrx/store";

import { Course } from "src/app/modules/course/models/course.model";
import { CoursesReqParams } from "src/app/modules/course/models/courses-req-params";

export enum CoursesActionTypes {
    GetCourses = '[Courses] GetCourses',
    StoreCourses = '[Courses] StoreCourses',
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

export class Error implements Action {
    readonly type: string = CoursesActionTypes.Error;

    constructor(public payload) {}
}

export type CoursesActions = GetCourses | StoreCourses | Error;
