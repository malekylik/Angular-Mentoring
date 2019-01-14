import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, switchMap, map, catchError, finalize, flatMap, concatMapTo } from 'rxjs/operators';
import { Router } from '@angular/router';

import { CoursesActionTypes, CoursesActions } from '../actions/courses.actions';
import { CoursesService } from 'src/app/modules/course/services/courses.service';
import { LoadingBlockService } from 'src/app/modules/core/services/loading-block/loading-block.service';
import { HttpErrorHandlingService } from 'src/app/modules/core/services/http-error-handling/http-error-handling.service';
import { Course } from 'src/app/modules/course/models/course.model';
import { BaseCourse } from 'src/app/modules/course/models/base-course';
import { ActionPayload } from 'src/app/modules/course/models/action-payload';
import { CoursesReqParams } from 'src/app/modules/course/models/courses-req-params';
import { CoursesDeletePayload } from 'src/app/models/courses-delete-action-payload';

@Injectable()
export class CoursesEffects {

    @Effect()
    getCourses$: Observable<ActionPayload<CoursesReqParams>> = this.actions$.pipe(
        ofType(CoursesActionTypes.GetCourses),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        switchMap((action: ActionPayload<CoursesReqParams>) => this.coursesService.getCourses(action.payload.start, action.payload.count, action.payload.textFragment)
            .pipe(
                map((courses: Course[]) => courses.map(course => new BaseCourse(course.id, course.name, course.date, course.length, course.description, course.authors, course.isTopRated))),
                map((courses: Course[]) => CoursesActions.storeCourses(courses)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(CoursesActions.error(error));
                }),
                finalize(() => this.loadingBlockService.showLoadingBlock(false)),
            )
        ),
    );

    @Effect()
    delete$: Observable<ActionPayload<void> | ActionPayload<CoursesActions>> = this.actions$.pipe(
        ofType(CoursesActionTypes.DeleteCourses),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        flatMap((action: ActionPayload<CoursesDeletePayload>) => this.coursesService.deleteCourse(action.payload.id)
            .pipe(concatMapTo([
                CoursesActions.resetCourses(),
                CoursesActions.getCourses(action.payload.coursesReqParams),
            ]), catchError(error => {
                this.httpErrorHandlingService.handlingError(error);
                return of(CoursesActions.error(error));
            }))
        ),
    );

    @Effect()
    addOrEdit$: Observable<ActionPayload<Course>> = this.actions$.pipe(
        ofType(CoursesActionTypes.AddCourse, CoursesActionTypes.EditCourse),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        flatMap((action: ActionPayload<Course>) =>
            (action.type === CoursesActionTypes.AddCourse ?
                this.coursesService.addCourse(action.payload) :
                this.coursesService.updateCourse(action.payload))
                    .pipe(
                        tap(() => this.router.navigateByUrl('courses')),
                        concatMapTo([CoursesActions.resetCourses()]),
                        catchError(error => {
                            this.httpErrorHandlingService.handlingError(error);
                            return of(CoursesActions.error(error));
                        }),
                        finalize(() => this.loadingBlockService.showLoadingBlock(false)),
                    )
        ),
    );

    constructor(
        private httpErrorHandlingService: HttpErrorHandlingService,
        private loadingBlockService: LoadingBlockService,
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router,
    ) { }
}
