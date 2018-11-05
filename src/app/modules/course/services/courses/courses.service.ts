import { Injectable } from '@angular/core';

import { Course } from '../../models/course.model';
import { coursesListMock } from '../../courses-list-mock';

@Injectable()
export class CoursesService {

  private coursesList: Course[] = [];
  private _isEditing: boolean = false;
  private editingCourseId: string = '';

  constructor() {
    this.coursesList = [...coursesListMock];
  }

  isEditing(): boolean {
    return this._isEditing;
  }

  setEditing(editing: boolean): void {
    this._isEditing = editing;
  }

  setEditingCourseId(id: string): void {
    this.editingCourseId = id;
  }

  getEditingCourseId(): string {
    return this.editingCourseId;
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
