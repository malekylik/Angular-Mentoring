import { CoursesReqParams } from '../modules/course/models/courses-req-params';

export interface CoursesDeletePayload {
    id: string,
    coursesReqParams?: CoursesReqParams
};
