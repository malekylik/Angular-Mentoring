import hash from 'object-hash';

import { Course } from './course.model';
import { Author, AuthorWithSplitedName, isAuthors } from './author.model';

export class BaseCourse implements Course {

    authors: Author[];

    constructor(
        public id: string,
        public name: string,
        public date: string,
        public length: number,
        public description: string,
        authors: Author[] | AuthorWithSplitedName[],
        public isTopRated: boolean = false,
    ) {
        if (isAuthors(authors)) {
            this.authors = authors;
        } else {
            this.authors = authors.map(author => ({
                id: author.id,
                name: `${author.firstName} ${author.lastName}`,
            }));
        }
    }

    static generateCourse(
        name: string,
        date: string,
        length: number,
        description: string,
        authors: Author[] | AuthorWithSplitedName[],
        isTopRated: boolean = false,
    ): BaseCourse {
        const courseForHash: Partial<Course> = {
            name,
            date,
            length,
            description,
            isTopRated,
        };

        return new BaseCourse(hash([courseForHash, Date.now()]), name, date, length, description, authors, isTopRated);
    }

    static generateCourseWithCurrentDate(
        name: string,
        length: number,
        description: string,
        authors: Author[] | AuthorWithSplitedName[],
        isTopRated: boolean = false,
    ): BaseCourse {
        const currentDate: Date = new Date();
        const currentFormatedDate = `${currentDate.getMonth() + 1}.${currentDate.getDate()}.${currentDate.getFullYear()}`;

        return BaseCourse.generateCourse(name, currentFormatedDate, length, description, authors, isTopRated);
    }
}
