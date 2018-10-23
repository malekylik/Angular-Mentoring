import hash from 'object-hash';

import { Course } from './course.model';

export class BaseCourse implements Course {
    constructor (
        public id: string,
        public title: string,
        public creationTime: string,
        public duration: number,
        public description: string,
        public topRated: boolean = false,
    ) {}

    static generateCourse(
        title: string,
        creationTime: string,
        duration: number,
        description: string,
        topRated: boolean = false,
    ): BaseCourse {
        const courseForHash: Partial<Course> = {
            title,
            creationTime,
            duration,
            description,
            topRated,
        };

        return new BaseCourse(hash(courseForHash), title, creationTime, duration, description, topRated);
    }

    static generateCourseWithCurrentDate(
        title: string,
        duration: number,
        description: string,
        topRated: boolean = false,
    ): BaseCourse {
        const currentDate: Date = new Date();
        const currentFormatedDate = `${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`;

        return BaseCourse.generateCourse(title, currentFormatedDate, duration, description, topRated);
    }
}
