import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { tap, switchMap, map, catchError, finalize, flatMap, concatMapTo } from "rxjs/operators";

import { CoursesActionTypes, GetCourses, Error as CoursesError, StoreCourses, DeleteCourses, ResetCourses, AddCourse, EditCourse } from "../actions/courses.actions";
import { CoursesService } from "src/app/modules/course/services/courses.service";
import { LoadingBlockService } from "src/app/modules/core/services/loading-block/loading-block.service";
import { HttpErrorHandlingService } from "src/app/modules/core/services/http-error-handling/http-error-handling.service";
import { Course } from "src/app/modules/course/models/course.model";
import { Router } from "@angular/router";

@Injectable()
export class CoursesEffects {

    @Effect()
    login$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionTypes.GetCourses),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        switchMap((action: GetCourses) => this.coursesService.getCourses(action.payload.start, action.payload.count, action.payload.textFragment)
            .pipe(
                map((courses: Course[]) => new StoreCourses(courses)),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(new CoursesError(error));
                }),
                finalize(() => this.loadingBlockService.showLoadingBlock(false)),
            )
        ),
    );

    @Effect()
    delete$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionTypes.DeleteCourses),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        flatMap((action: DeleteCourses) => this.coursesService.deleteCourse(action.payload.id)
            .pipe(
                concatMapTo([
                    new ResetCourses(),
                    new GetCourses(action.payload.coursesReqParams),
                ]),
                catchError(error => {
                    this.httpErrorHandlingService.handlingError(error);
                    return of(new CoursesError(error));
                }),
            )
        ),
    );

    @Effect()
    addOrEdit$: Observable<Action> = this.actions$.pipe(
        ofType(CoursesActionTypes.AddCourse, CoursesActionTypes.EditCourse),
        tap(() => this.loadingBlockService.showLoadingBlock(true)),
        flatMap((action: AddCourse | EditCourse) =>
            (action.type === CoursesActionTypes.AddCourse ?
                this.coursesService.addCourse(action.payload) :
                this.coursesService.updateCourse(action.payload))
                    .pipe(
                        tap(() => this.router.navigateByUrl('courses')),
                        concatMapTo([
                            new ResetCourses(),
                            new GetCourses({}),
                        ]),
                        catchError(error => {
                            this.httpErrorHandlingService.handlingError(error);
                            return of(new CoursesError(error));
                        }),
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
