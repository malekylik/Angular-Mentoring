import { Course } from '../../models/course.model';
import { coursesListMock } from '../../courses-list-mock';

export class CoursesService {

  private coursesList: Course[] = [];

  constructor() {
    this.coursesList = [...coursesListMock];
  }

  getCourses(): Course[] {
    return this.coursesList;
  }

  getCourse(id: string): Course | null {
    return this.coursesList.find((course) => course.id === id) || null;
  }

  addCourse(course: Course): void {
    this.coursesList = [...this.coursesList, course];
  }

  updateCourse(course: Course): boolean {
    const index = this.coursesList.findIndex((_course) => _course.id === course.id);

    if (index !== -1) {
      this.coursesList[index] = {
        ...course
      };

      return true;
    }

    return false;
  }

  deleteCourse(id: string): void {
    const index = this.coursesList.findIndex((course) => course.id === id);

    if (index !== -1) {
      this.coursesList.splice(index, 1);
    }
  }
}
