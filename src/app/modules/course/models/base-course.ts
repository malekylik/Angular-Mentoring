import hash from 'object-hash';

import { Course } from './course.model';

export class BaseCourse implements Course {
    constructor (
        public id: string,
        public name: string,
        public date: string,
        public length: number,
        public description: string,
        public topRated: boolean = false,
    ) {}

    static generateCourse(
        name: string,
        date: string,
        length: number,
        description: string,
        topRated: boolean = false,
    ): BaseCourse {
        const courseForHash: Partial<Course> = {
            name,
            date,
            length,
            description,
            topRated,
        };

        return new BaseCourse(hash([courseForHash, Date.now()]), name, date, length, description, topRated);
    }

    static generateCourseWithCurrentDate(
        name: string,
        length: number,
        description: string,
        topRated: boolean = false,
    ): BaseCourse {
        const currentDate: Date = new Date();
        const currentFormatedDate = `${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`;

        return BaseCourse.generateCourse(name, currentFormatedDate, length, description, topRated);
    }
}
